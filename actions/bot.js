import { PLAYER_NAMES, BOT_PREFIX } from "../constants.js";
import {
  GetPlayerLastMatchData,
  GetPlayerUserData,
  GetLast7DaysData,
  GetKillsData,
  getAverageDamage,
} from "./league.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import {
  isCommandUsername,
  isGreetingCommand,
  isHelpCommand,
  isImage,
  isRankSubcommand,
  isStatisticCommand,
  isChatGPT,
} from "../utils/parseCommands.js";
import { getPrompt } from "./ai.js";

export function parseCommands(message) {
  const command = message.content.split(BOT_PREFIX)[1].trim();
  let options = {};

  if (isImage(command)) {
    options.type = "image";
    options.prompt = getPrompt(message.content);
    return options;
  }

  if (isChatGPT(command)) {
    options.type = "text";
    options.prompt = getPrompt(message.content);
    return options;
  }

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
}

export async function handleGetLastMatchData(summonerName, discordUser) {
  const user = leagueUsername(summonerName);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  return lastGameCommentary(matchData, user.userName, discordUser);
}

export async function handleGetLeagueUserData(userName, discordUser) {
  const userData = await GetPlayerUserData(userName);
  return `<@${discordUser}> is in ${userData.tier} ${userData.rank} and has ${
    userData.leaguePoints
  } LP with a ${(
    (userData.wins / (userData.wins + userData.losses)) *
    100
  ).toFixed(2)}% win rate in ${userData.wins + userData.losses} games.`;
}

export async function handleGetLeadboardRankings() {
  const data = PLAYER_NAMES.map(async function (player) {
    try {
      const userData = await GetPlayerUserData(player.userName);
      if (userData) {
        return userData;
      }
    } catch (err) {
      console.error(err);
    }
  });

  const final = await Promise.all(data);

  return final.filter((el) => el !== undefined);
}

export async function handleGetWeeklyData() {
  return await GetLast7DaysData();
}

export async function handleGetKillsData() {
  return await GetKillsData();
}

export async function handleGetAverageDamage() {
  return await getAverageDamage();
}
