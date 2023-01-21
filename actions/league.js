import axios from "axios";
import {
  API_KEY,
  PLAYER_NAMES,
  LEAGUE_ROUTES,
  PARTICIPANT_FIELDS,
} from "../constants.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { aggregatePlayerData } from "../utils/aggregatePlayerData.js";
import { calculateAverage } from "../utils/calculateAverage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import { Participants } from "../models/Participant.js";
import { AppDataSource } from "../db/db.js";

const Participant = AppDataSource.getRepository(Participants);

export class LeagueActions {
  constructor() {}

  async handleGetPlayerLastMatchData(puuid) {
    try {
      const url =
        LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
        puuid +
        `/ids?start=0&count=20&api_key=${API_KEY}`;
      const response = await axios.get(url);
      const MATCH_ID =
        LEAGUE_ROUTES.MATCH_BY_ID + response.data[0] + `/?api_key=${API_KEY}`;
      const res = await axios.get(MATCH_ID);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  async handleGetPlayerUserData(user) {
    try {
      // URL for retrieving the User's ID
      const url = `${LEAGUE_ROUTES.PLAYER_DETAILS}${user}?api_key=${API_KEY}`;
      const response = await axios.get(url);

      // URL for retrieving the User's League Performance
      const playerStatsUrl = `${LEAGUE_ROUTES.PLAYER_STATS}${response.data.id}?api_key=${API_KEY}`;
      const res = await axios.get(playerStatsUrl);

      return res.data[0];
    } catch (err) {
      console.error(err);
    }
  };

  async handleGetLast7DaysData() {
    const LAST_7_DAYS = Date.now() - 604800000;
    const weeksData = await Participant.query(
      `SELECT kills, deaths, win, "summonerName" FROM participant AS p WHERE p."timeStamp" > ${LAST_7_DAYS}`
    );
    const playersWeeklyData = PLAYER_NAMES.map((p) => {
      let obj = {};
      obj["kills"] = aggregatePlayerData(weeksData, "kills", p.userName);
      obj["deaths"] = aggregatePlayerData(weeksData, "deaths", p.userName);
      obj["wins"] = aggregatePlayerData(weeksData, "wins", p.userName);
      obj["games"] = weeksData.filter(
        (player) => player.summonerName === p.userName
      ).length;
      obj["summonerName"] = p.userName;
      return obj;
    });
    return playersWeeklyData.sort((a, b) => b.games - a.games);
  };

  async handleGetKillsData() {
    const kills = await Participant.query(
      `SELECT kills, deaths, "summonerName" FROM participant`
    );
    const playersKills = PLAYER_NAMES.map((p) => {
      let obj = {};
      obj["kills"] = calculateAverage(kills, "kills", p.userName);
      obj["deaths"] = calculateAverage(kills, "deaths", p.userName);
      obj["summonerName"] = p.userName;
      return obj;
    });
    return playersKills.sort((a, b) => b.kills - a.kills);
  };

  async handleGetAverageDamage() {
    const data = await Participant.query(
      `SELECT "totalDamageDealtToChampions", "summonerName" FROM participant`
    );
    const playersKills = PLAYER_NAMES.map((p) => {
      let obj = {};
      obj["totalDamageDealtToChampions"] = calculateAverage(
        data,
        "totalDamageDealtToChampions",
        p.userName
      );
      obj["summonerName"] = p.userName;
      return obj;
    });
    return playersKills.sort(
      (a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions
    );
  };
};

export const GetTrackedPlayersData = async (discordClient) => {
  // Get the last game data of each tracked player.
  for (let i = 0; i < PLAYER_NAMES.length; i++) {
    const player = PLAYER_NAMES[i];
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      player.puuid +
      `/ids?start=0&count=3&api_key=${API_KEY}`;

    try {
      // Request list of last 20 Match ID's
      const results = await axios.get(url);
      const { data } = results;

      // Get the match ID from the last game played
      const lastMatch = data[0];

      // Check if Match Exists & Insert if Not
      const currentMatches = await Participant.query(
        `SELECT "matchId" FROM participant AS p WHERE p."summonerName" = '${player.userName}';`
      );
      const exists =
        currentMatches.filter((match) => match.matchId === lastMatch).length >
        0;

      if (!exists) {
        // URL for Requesting Last Match Data
        const matchById =
          LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

        const response = await axios.get(matchById);
        if (response.data.info.queueId === 420) {
          const discordUser = await getDiscordUser(
            discordClient,
            player.discordUsername
          );

          if (discordUser !== null) {
            const channel = await discordClient.channels.fetch(
              "1062772832658010213"
            );
            channel.send(
              lastGameCommentary(response.data, player.userName, discordUser)
            );
          }

          // Filter by Specific Player in "Parent Loop"
          const participantInfo = response.data.info.participants.filter(
            (p) => p.summonerName === player.userName
          )[0];

          let game = {};
          game["timeStamp"] = response.data.info.gameStartTimestamp;
          game["matchId"] = `${response.data.metadata.matchId}`;
          for (let i = 0; i < PARTICIPANT_FIELDS.length; i++) {
            if (PARTICIPANT_FIELDS[i] === "perks") {
              game[PARTICIPANT_FIELDS[i]] = JSON.stringify(
                participantInfo[PARTICIPANT_FIELDS[i]]
              );
            }
            game[PARTICIPANT_FIELDS[i]] =
              participantInfo[PARTICIPANT_FIELDS[i]];
          }
          await Participant.save(game);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};
