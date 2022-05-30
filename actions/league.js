import axios from "axios";
import {
  API_KEY,
  PLAYER_NAMES,
  LEAGUE_ROUTES,
  CUCU_GUILD_ID,
  PARTICIPANT_FIELDS,
} from "../constants.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { aggregatePlayerData } from "../utils/aggregatePlayerData.js";
import { calculateAverage } from "../utils/calculateAverage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import { Participants } from "../models/Participant.js";
import { AppDataSource } from "../db/db.js";

const Participant = AppDataSource.getRepository(Participants);

// Return Last Match Data of Provided Username
export const GetPlayerLastMatchData = async (puuid) => {
  try {
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      puuid +
      `/ids?start=0&count=20&api_key=${API_KEY}`;
    const { data } = await axios.get(url);
    const lastMatch = data[0];
    const matchById =
      LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;
    const { data: matchData } = await axios.get(matchById);
    return matchData;
  } catch (error) {
    return "There was an error processing the data.";
  }
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
            const channel = await discordClient.channels.fetch(CUCU_GUILD_ID);
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
              game[PARTICIPANT_FIELDS[i]] = JSON.stringify(participantInfo[PARTICIPANT_FIELDS[i]]);
            }
            game[PARTICIPANT_FIELDS[i]] = participantInfo[PARTICIPANT_FIELDS[i]];
          }
          await Participant.save(game);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const GetPlayerUserData = async (user) => {
  // URL for retrieving the User's ID
  const url = `${LEAGUE_ROUTES.PLAYER_DETAILS}${user}?api_key=${API_KEY}`;
  const { data } = await axios.get(url);

  // URL for retrieving the User's League Performance
  const playerStatsUrl = `${LEAGUE_ROUTES.PLAYER_STATS}${data.id}?api_key=${API_KEY}`;
  const { data: playerData } = await axios.get(playerStatsUrl);

  return playerData[0];
};

export const GetLast7DaysData = async () => {
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

export const GetKillsData = async () => {
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
