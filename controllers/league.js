import axios from "axios";
import { LEAGUE_ROUTES, API_KEY } from "../constants.js";

// Return Last Match Data of Provided Username
export const GetPlayerMatchHistory = async (puuid, userName) => {
  try {
    const url = LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID + puuid + `/ids?start=0&count=20&api_key=${API_KEY}`
    const { data } = await axios.get(url);
    const lastMatch = data[0];
    const matchById = LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`
    const { data: matchData } = await axios.get(matchById);
    const userData = matchData.info.participants.filter((player) => {
        return Object.values(player).some((val) => val.toString().includes(userName))
    })
    if (userData) {
      return userData[0];
    } else {
      return "Chama no encontre nada";
    }
  } catch (error) {
    return "There was an error processing the data.";
  }
};
