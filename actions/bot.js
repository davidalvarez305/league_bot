import { PLAYER_NAMES, BOT_PREFIX } from "../constants.js";
import {
  GetPlayerLastMatchData,
  GetPlayerUserData,
  GetLast7DaysData,
  GetKillsData,
} from "./league.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import {
  isCommandUsername,
  isGreetingCommand,
  isHelpCommand,
  isRankSubcommand,
  isStatisticCommand,
} from "../utils/parseCommands.js";

export const ParseCommands = (message) => {
  const command = message.content.split(BOT_PREFIX)[1].trim();
  let options = {};

  if (isCommandUsername(command)) {
    options.type = "player";
    options.player = leagueUsername(command);
    return options;
  }

  if (isGreetingCommand(command)) {
    options.type = "greeting";
    return options;
  }

  if (isHelpCommand(command)) {
    options.type = "help";
    return options;
  }

  if (isRankSubcommand(message.content)) {
    options.type = "player";
    options.subCommand = "rank";
    options.player = leagueUsername(command.split(" ")[0]);
    return options;
  }

  if (isStatisticCommand(command).length > 0) {
    options.type = "statistic";
    options.subCommand = isStatisticCommand(command)[0];
    return options;
  }

  return options;
};

export const GetLastMatchData = async (summonerName, discordUser) => {
  const user = leagueUsername(summonerName);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  return lastGameCommentary(matchData, user.userName, discordUser);
};

export const GetLeagueUserData = async (userName, discordUser) => {
  const userData = await GetPlayerUserData(userName);
  return `<@${discordUser}> is in ${userData.tier} ${userData.rank} and has ${
    userData.leaguePoints
  } LP with a ${(
    (userData.wins / (userData.wins + userData.losses)) *
    100
  ).toFixed(2)}% win rate in ${userData.wins + userData.losses} games.`;
};

export const GetLeaderboardRankings = async () => {
  const data = PLAYER_NAMES.map(async (currentPlayer) => {
    return await GetPlayerUserData(currentPlayer.userName);
  });

  return Promise.all(data);
};

export const GetWeeklyData = async (getConnection) => {
  return await GetLast7DaysData(getConnection);
};

export const GetPlayerKillsData = async (getConnection) => {
  return await GetKillsData(getConnection);
};
