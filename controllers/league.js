import axios from "axios";
import { LEAGUE_ROUTES, API_KEY, PLAYER_NAMES } from "../constants.js";

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

export const GetTrackedPlayersData = async (callback) => {
  // Get the last game data of each tracked player.
  const results = PLAYER_NAMES.map(async (player) => {
    return await callback(player);
  });
  return results;
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
