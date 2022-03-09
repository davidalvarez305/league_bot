import { PLAYER_NAMES } from "../constants.js";
import {
  GetPlayerLastMatchData,
  GetPlayerUserData,
  GetLast7DaysData,
} from "../controllers/league.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";

export const getLastMatchData = async (summonerName, discordUser) => {
  const user = leagueUsername(summonerName);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  return lastGameCommentary(matchData, user.userName, discordUser);
};

export const getLeagueUserData = async (userName, discordUser) => {
  const userData = await GetPlayerUserData(userName);
  return `<@${discordUser}> is in ${userData.tier} ${userData.rank} and has ${
    userData.leaguePoints
  } LP with a ${(
    (userData.wins / (userData.wins + userData.losses)) *
    100
  ).toFixed(2)}% win rate in ${userData.wins + userData.losses} games.`;
};

export const getLeaderboardRankings = async () => {
  const data = PLAYER_NAMES.map(async (currentPlayer) => {
    return await GetPlayerUserData(currentPlayer.userName);
  });

  return Promise.all(data);
};

export const getWeeklyData = async (getConnection) => {
  return await GetLast7DaysData(getConnection);
};
