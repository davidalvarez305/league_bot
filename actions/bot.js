import { PLAYER_NAMES } from "../constants.js";
import {
  GetPlayerLastMatchData,
  GetPlayerUserData,
} from "../controllers/league.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";

export const getLastMatchData = async (summonerName, discordUser) => {
  const user = leagueUsername(summonerName);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  return `In the last game, <@${discordUser}> got ${matchData.kills} kills & ${matchData.deaths} deaths.`;
};

export const getLeagueUserData = async (userName, discordUser) => {
  const userData = await GetPlayerUserData(userName);
  return `<@${discordUser}> is in ${userData.tier} ${userData.rank} and has ${userData.leaguePoints} LP with a ${((userData.wins / (userData.wins + userData.losses)) * 100).toFixed(2)}% win rate in ${(userData.wins + userData.losses)} games.`;
};

export const getLeaderboardRankings = async () => {

  return PLAYER_NAMES.slice(0, 2).map(async (currentPlayer) => {
    return await GetPlayerUserData(currentPlayer.userName);
  });
}
