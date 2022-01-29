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
    const userData = matchData.info.participants.filter((player) => {
      return Object.values(player).some((val) =>
        val.toString().includes(userName)
      );
    });
    if (userData) {
      return userData[0];
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
