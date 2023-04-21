import { PLAYER_NAMES, BOT_PREFIX } from "../constants.js";
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
  isChampionCommand,
} from "../utils/parseCommands.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { EmbedBuilder, Message } from "discord.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";
import { formatDamageMessage } from "../utils/bot/formatDamageMessage.js";
import formatWinsMessage from "../utils/bot/formatWinsMessage.js";
import formatChampionData from "../utils/bot/formatChampionData.js";
import formatMultiKills from "../utils/bot/formatMultiKills.js";
import formatTimePlayed from "../utils/bot/formatTimePlayed.js";
import formatRageQuits from "../utils/bot/formatRageQuits.js";
import formatDuos from "../utils/bot/formatDuos.js";
import { handleLeagueChampionData, handleLeagueDuo, handleLeagueGetAverageDamage, handleLeagueGetKillsData, handleLeagueGetLast7DaysData, handleLeagueGetPlayerLastMatchData, handleLeagueGetPlayerUserData, handleLeagueGetWinsData, handleLeagueMultiData, handleLeagueRageQuits, handleLeagueTimePlayed } from "../actions/league";
import { getPrompt } from "./ai.js";
import { CommandOptions, PlayerStats } from "../types/types.js";

export function parseBotCommands(message: Message<boolean>): CommandOptions {
  const command = message.content.split(BOT_PREFIX)[1].trim();
  let options = <CommandOptions>{};

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

  if (isChampionCommand(message.content)) {
    options.type = "player";
    options.subCommand = "champions";
    options.player = leagueUsername(command.split(" ")[0]);
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

export async function handleGetLastMatchData(summonerName: string, discordUser: string) {
  try {
    const user = leagueUsername(summonerName);
    const matchData = await handleLeagueGetPlayerLastMatchData(user.puuid);
    return await lastGameCommentary(matchData, user.userName, discordUser);
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGetLeagueUserData(userName: string, discordUser: string) {
  try {
    const userData = await handleLeagueGetPlayerUserData(userName);
    return `<@${discordUser}> is in ${userData.tier} ${userData.rank} and has ${
      userData.leaguePoints
    } LP with a ${(
      (userData.wins / (userData.wins + userData.losses)) *
      100
    ).toFixed(2)}% win rate in ${userData.wins + userData.losses} games.`;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGetLeadboardRankings() {
  let data: PlayerStats[] = [];


  PLAYER_NAMES.forEach(async function (player) {
    try {
      const userData = await handleLeagueGetPlayerUserData(player.userName);
      if (userData) {
        data.push(userData);
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  await Promise.all(data);

  const rankings = rankPlayersAlgo(data);

  const embed = new EmbedBuilder()
    .setColor("DarkBlue")
    .setTitle("League of Legends Leaderboard")
    .setDescription("Current Rankings of Discord Members")
    .addFields(formatMessage(rankings) as any);

  return { embeds: [embed] };
}

export async function handleGetWeeklyData() {
  try {
    const data = await handleLeagueGetLast7DaysData();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle("League of Legends Weekly Ranks")
      .setDescription("Weekly Rankings of Discord Members")
      .addFields(formatWeeklyRankingsMessage(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGetKillsData() {
  try {
    const data = await handleLeagueGetKillsData();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle("League of Legends Wins")
      .setDescription("Wins of Discord Members")
      .addFields(formatKillsMessage(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGetAverageDamage() {
  try {
    const data = await handleLeagueGetAverageDamage();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle("Discord Top Damage")
      .setDescription("Damage Rankings of Discord")
      .addFields(formatDamageMessage(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGetWinsData() {
  try {
    const data = await handleLeagueGetWinsData();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle("League of Legends Wins")
      .setDescription("Wins Rankings of Discord Members")
      .addFields(formatWinsMessage(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleChampionData(userName: string) {
  try {
    const data = await handleLeagueChampionData(userName);

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle(`${userName} Champion Data`)
      .setDescription("Current Record of Champions")
      .addFields(formatChampionData(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleMultiData() {
  try {
    const data = await handleLeagueMultiData();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle(`Top Multi-Kills`)
      .setDescription("Discord Members")
      .addFields(formatMultiKills(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleTimePlayed() {
  try {
    const data = await handleLeagueTimePlayed();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle(`Hours Burning`)
      .setDescription("Quemadera Full Time")
      .addFields(formatTimePlayed(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleRageQuits() {
  try {
    const data = await handleLeagueRageQuits();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle(`Biggest Rage Quitter NA`)
      .setDescription("Professional ALT-F4 Chart")
      .addFields(formatRageQuits(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleDuo() {
  try {
    const data = await handleLeagueDuo();

    const embed = new EmbedBuilder()
      .setColor("DarkBlue")
      .setTitle(`Best Duos in Discord`)
      .setDescription("Games & Win % by Duo")
      .addFields(formatDuos(data) as any);

    return { embeds: [embed] };
  } catch (err) {
    throw new Error(err);
  }
}
