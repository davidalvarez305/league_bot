import { BotActions, parseCommands } from "../actions/bot.js";
import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import { formatDamageMessage } from "../utils/bot/formatDamageMessage.js";
import { handleRequestImage, handleRequestText } from "./ai.js";
import { EmbedBuilder } from "discord.js";

const botActions = new BotActions();

export class Bot {
  constructor(discordClient) {
    this.discordClient = discordClient;
  };

  handleBotResponse(msg, response) {
    return msg.reply(response);
  };

  async handleMessage(msg) {
    const args = botActions.parseCommands(msg);
    let response;

    try {
      switch (args.type) {
        case "help":
          const embed = new EmbedBuilder()
            .setColor("DARK_BLUE")
            .setTitle("Command Guide")
            .setDescription("Examples of Commands")
            .addFields(formatHelpMessage());

          return { embeds: [embed] };
        case "image":
          return botActions.handleRequestImage(args.prompt);
        case "text":
          return botActions.handleRequestText(args.prompt);
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
            const botResponse = await botActions.handleGetLeagueUserData(
              args.player.userName,
              discordUser
            );
            return botResponse;
          } else {
            const response = await botActions.handleGetLastMatchData(
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
            const last7Daysdata = await botActions.handleGetWeeklyData();

            const embed = new EmbedBuilder()
              .setColor("DARK_BLUE")
              .setTitle("League of Legends Weekly Ranks")
              .setDescription("Weekly Rankings of Discord Members")
              .addFields(formatWeeklyRankingsMessage(last7Daysdata));

            return { embeds: [embed] };
          }
          if (args.subCommand === "kills") {
            const killsData = await botActions.handleGetKillsData();

            const embed = new EmbedBuilder()
              .setColor("DARK_BLUE")
              .setTitle("League of Legends Weekly Ranks")
              .setDescription("Weekly Rankings of Discord Members")
              .addFields(formatKillsMessage(killsData));

            return { embeds: [embed] };
          }
          if (args.subCommand === "damage") {
            const data = await botActions.handleGetAverageDamage();

            const embed = new EmbedBuilder()
              .setColor("DARK_BLUE")
              .setTitle("League of Legends Weekly Ranks")
              .setDescription("Weekly Rankings of Discord Members")
              .addFields(formatDamageMessage(data));

            return { embeds: [embed] };
          }
        default:
          return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
      }
    } catch (err) {
      console.error(err);
    }

    this.handleBotResponse(msg, response);    
  }
}
