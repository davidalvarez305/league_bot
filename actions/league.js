import axios from "axios";
import {
  API_KEY,
  PLAYER_NAMES,
  LEAGUE_ROUTES,
  PARTICIPANT_FIELDS,
} from "../constants.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import { Participants } from "../models/Participant.js";
import { AppDataSource } from "../db/db.js";

const Participant = AppDataSource.getRepository(Participants);

export class LeagueActions {
  constructor() {}

  async handleGetWinsData() {
    try {
      const data = await Participant.query(
        `SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        COUNT(*) AS "games",
        COUNT(CASE WHEN win THEN 1 END) / COUNT(*)::decimal AS "win rate",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY COUNT(CASE WHEN win THEN 1 END) DESC;`
      );
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

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
      throw new Error(err);
    }
  }

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
      throw new Error(err);
    }
  }

  async handleGetLast7DaysData() {
    const LAST_7_DAYS = Date.now() - 604800000;
    try {
      return await Participant.query(
        `SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        COUNT(*) AS "games",
        AVG(kills)::decimal AS "kills",
        AVG(deaths)::decimal AS "deaths",
        "summonerName"
        FROM participant
        WHERE "timeStamp" > ${LAST_7_DAYS}
        GROUP BY "summonerName"
        ORDER BY games DESC;`
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetKillsData() {
    try {
      return await Participant.query(
        `SELECT
        ROUND(AVG(kills)::decimal, 2) AS "kills",
        ROUND(AVG(deaths)::decimal, 2) AS "deaths",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY AVG(kills) DESC;`
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetAverageDamage() {
    try {
      return await Participant.query(
        `SELECT
        ROUND(AVG("totalDamageDealtToChampions")::decimal, 2) AS "totalDamageDealtToChampions",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY AVG("totalDamageDealtToChampions") DESC;`
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleChampionData(userName) {
    try {
      return await Participant.query(
        `
        SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        ROUND(COUNT(CASE WHEN win THEN 1 END) / COUNT(*)::decimal, 2) AS "win rate",
        COUNT(*) as "games",
        ROUND(AVG("totalDamageDealtToChampions")::decimal, 2) AS "damage",
        ROUND(AVG("kills")::decimal, 2) AS "kills",
        ROUND(AVG("deaths")::decimal, 2) AS "deaths",
        ROUND(AVG("assists")::decimal, 2) AS "assists",
        "championName"
        FROM participant
        where "summonerName" = '${userName}'
        GROUP BY "championName"
        ORDER BY COUNT(*) DESC;
        `
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleMultiData() {
    try {
      return await Participant.query(
        `
        SELECT SUM("largestMultiKill") AS "multiKills", SUM("pentaKills") AS "pentaKills", "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY SUM("largestMultiKill") DESC;
        `
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleTimePlayed() {
    try {
      return await Participant.query(`
        SELECT SUM("timePlayed") / (60 * 60) AS "timePlayed", "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY SUM("timePlayed") DESC;
      `)
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleRageQuits() {
    try {
      return await Participant.query(`
        SELECT COUNT(CASE WHEN "gameEndedInEarlySurrender"  THEN 1 END) AS "rageQuits",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY COUNT(CASE WHEN "gameEndedInEarlySurrender"  THEN 1 END) DESC;
      `);
    } catch (err) {
      throw new Error(err);
    }
  }
}

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
