import { EmbedBuilder } from "discord.js";
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
import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";

export function parseCommands(message) {
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

export async function handleBotResponse(args) {
  switch (args.type) {
    case "help":
      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle("Command Guide")
        .setDescription("Examples of Commands")
        .addFields(formatHelpMessage());

      return { embeds: [embed] };
    case "greeting":
      return GREETINGS[getRandomIndex(GREETINGS.length)];
    case "player":
      const discordUser = await getDiscordUser(
        discordClient,
        args.player.discordUsername
      );
      if (!discordUser) {
        return "User doesn't exist.";
      }
      if (args.subCommand) {
        const botResponse = await handleGetLeagueUserData(
          args.player.userName,
          discordUser
        );
        return botResponse;
      } else {
        const response = await handleGetLastMatchData(
          args.player.userName,
          discordUser
        );
        return response;
      }
    case "statistic":
      if (args.subCommand === "leaderboard") {
        const players = await handleGetLeadboardRankings();
        const rankings = rankPlayersAlgo(players);

        const embed = new EmbedBuilder()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Leaderboard")
          .setDescription("Current Rankings of Discord Members")
          .addFields(formatMessage(rankings));

        return { embeds: [embed] };
      }
      if (args.subCommand === "weekly") {
        const last7Daysdata = await handleGetWeeklyData();

        const embed = new EmbedBuilder()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatWeeklyRankingsMessage(last7Daysdata));

        return { embeds: [embed] };
      }
      if (args.subCommand === "kills") {
        const killsData = await handleGetKillsData();

        const embed = new EmbedBuilder()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatKillsMessage(killsData));

        return { embeds: [embed] };
      }
    default:
      return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
  }
}
