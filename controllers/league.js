import axios from "axios";
import { LEAGUE_ROUTES, API_KEY } from "../constants.js";

export const GetPlayerMatchHistory = async (req, res) => {
    const puuid = req.params.puuid;
  try {
    const url = LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID + puuid + `/ids?start=0&count=20&api_key=${API_KEY}`
    const { data } = await axios.get(url);
    const lastMatch = data[0];
    const matchById = LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`
    const { data: matchData } = await axios.get(matchById);
    const iDecimo = matchData.info.participants.filter((player) => {
        return Object.values(player).some((val) => val.toString().includes("iDecimo"))
    })
    console.log('iDecimo: ', iDecimo)
    if (matchData) {
      return res.status(200).json({ data: matchData });
    } else {
      return res.status(404).json({ data: "Not found." });
    }
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
};
