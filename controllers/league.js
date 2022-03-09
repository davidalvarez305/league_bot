import axios from "axios";
import {
  API_KEY,
  PLAYER_NAMES,
  LEAGUE_ROUTES,
  CUCU_GUILD_ID,
  POSTGRES_CAMEL_CASE,
  PARTICIPANT_FIELDS,
} from "../constants.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { aggregatePlayerData } from "../utils/aggregatePlayerData.js";

// Return Last Match Data of Provided Username
export const GetPlayerLastMatchData = async (puuid, userName) => {
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
    if (matchData) {
      return matchData;
    } else {
      return "Chama no encontre nada";
    }
  } catch (error) {
    return "There was an error processing the data.";
  }
};

export const GetTrackedPlayersData = async (discordClient, getConnection) => {
  // Get the last game data of each tracked player.
  PLAYER_NAMES.map(async (player) => {
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      player.puuid +
      `/ids?start=0&count=3&api_key=${API_KEY}`;

    // Request list of last 20 Match ID's
    let data;
    await axios
      .get(url)
      .then((results) => {
        data = results.data;
      })
      .catch(console.error);

    const participantFields = PARTICIPANT_FIELDS.map((f) => {
      if (f.match(POSTGRES_CAMEL_CASE)) {
        return `"${f}"`;
      } else {
        return `${f}`;
      }
    }).join(", ");

    // Get the match ID from the last game played
    const lastMatch = data[0];

    // Check if Match Exists & Insert if Not
    const currentMatches = await getConnection().query(
      `SELECT "matchId" FROM participant AS p WHERE p."summonerName" = '${player.userName}';`
    );
    const exists =
      currentMatches.filter((match) => match.matchId === lastMatch).length > 0;

    if (!exists) {
      // URL for Requesting Last Match Data
      const matchById =
        LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

      await axios
        .get(matchById)
        .then(async (response) => {
          if (response.data.info.queueId === 420) {
            // Match Commentary
            const discordGuild = await discordClient.guilds.fetch(
              CUCU_GUILD_ID
            );

            // Find the ID of the Discord User
            const foundUser = await discordGuild.members.search({
              query: player.discordUsername,
            });

            if (foundUser.length > 0) {
              // Tag Discord user in the commentary
              const discordUser = foundUser.values().next().value.user.id;
              discordClient.channels
                .fetch(CUCU_GUILD_ID)
                .then((channel) =>
                  channel.send(
                    lastGameCommentary(
                      response.data,
                      player.userName,
                      discordUser
                    )
                  )
                );
            }

            // Filter by Specific Player in "Parent Loop"
            const participantInfo = response.data.info.participants.filter(
              (p) => p.summonerName === player.userName
            )[0];

            // Push only the values of the fields that I've selected in DB
            let values = [];
            values.push(response.data.info.gameStartTimestamp);
            values.push(`'${response.data.metadata.matchId}'`);
            for (const [key, value] of Object.entries(participantInfo)) {
              if (PARTICIPANT_FIELDS.includes(key)) {
                if (typeof value === "string") {
                  values.push(`'${value}'`);
                }
                if (typeof value === "object") {
                  values.push(`'NONE'`);
                }
                if (typeof value === "boolean" || typeof value === "number") {
                  values.push(value);
                }
              }
            }

            if (values.length === PARTICIPANT_FIELDS.length) {
              // Insert SQL Query
              const sql = `INSERT INTO participant (${participantFields}) VALUES (${values.join(
                ", "
              )});`;
              await getConnection().query(sql);
            }
          }
        })
        .catch(console.error);
    }
  });
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

export const GetLast7DaysData = async (getConnection) => {
  const LAST_7_DAYS = Date.now() - 604800000;
  const weeksData = await getConnection().query(
    `SELECT kills, deaths, win, "summonerName" FROM participant AS p WHERE p."timeStamp" > ${LAST_7_DAYS}`
  );
  const playersWeeklyData = PLAYER_NAMES.map((p) => {
    let obj = {};
    obj["kills"] = aggregatePlayerData(weeksData, "kills", p.userName);
    obj["deaths"] = aggregatePlayerData(weeksData, "deaths", p.userName);
    obj["wins"] = aggregatePlayerData(weeksData, "wins", p.userName);
    obj["games"] = weeksData.filter(player => player.summonerName === p.userName).length;
    obj["summonerName"] = p.userName;
    return obj;
  });
  return playersWeeklyData.sort((a, b) => b.games - a.games);
};
