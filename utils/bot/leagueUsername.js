import { PLAYER_NAMES } from "../../constants.js";

// Return the League of Legends character name
export const leagueUsername = (userName) => {
  const user = PLAYER_NAMES.filter((p) => {
    return Object.values(p).some((val) => val.toLowerCase().includes(userName.toLowerCase()));
  });
  if (user.length > 0) {
    return user[0];
  }
  return {
    userName: "",
    puuid: "",
    discordUsername: ""
  };
};
