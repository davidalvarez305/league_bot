import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import {
  GetLeagueUserData,
  GetLastMatchData,
  GetLeaderboardRankings,
  GetWeeklyData,
  GetPlayerKillsData,
  ParseCommands,
} from "../actions/bot.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { MessageEmbed } from "discord.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";

export const BotController = async (msg, discordClient, getConnection) => {
  const args = ParseCommands(msg);
  console.log(args);

  switch (args.type) {
    case "help":
      const embed = new MessageEmbed()
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
      if (args.subCommand) {
        const botResponse = await GetLeagueUserData(
          args.player.userName,
          discordUser
        );
        return botResponse;
      } else {
        const response = await GetLastMatchData(
          args.player.userName,
          discordUser
        );
        return response;
      }
    case "statistic":
      if (args.subCommand === "leaderboard") {
        const players = await GetLeaderboardRankings();
        const rankings = rankPlayersAlgo(players);

        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Leaderboard")
          .setDescription("Current Rankings of Discord Members")
          .addFields(formatMessage(rankings));

        return { embeds: [embed] };
      }
      if (args.subCommand === "weekly") {
        const last7Daysdata = await GetWeeklyData(getConnection);

        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatWeeklyRankingsMessage(last7Daysdata));

        return { embeds: [embed] };
      }
      if (args.subCommand === "kills") {
        const killsData = await GetPlayerKillsData(getConnection);

        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatKillsMessage(killsData));

        return { embeds: [embed] };
      }
    default:
      return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
  }
};
