import { GetPlayerLastMatchData } from "../controllers/league.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";

export const getLastMatchData = async (command, discordUser) => {
  const user = leagueUsername(command);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  return `In the last game, <@${discordUser}> got ${matchData.kills} & ${matchData.deaths}`
};
