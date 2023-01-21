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
import { EmbedBuilder } from "discord.js";
import { AiClient } from "../actions/ai.js";

const botActions = new BotActions();
const aiActions = new AiClient();

export class Bot {
  constructor(discordClient) {
    this.discordClient = discordClient;
  }

  handleBotResponse(msg, response) {
    return msg.reply(response);
  }

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
          return aiActions.handleRequestImage(args.prompt);
        case "text":
          return aiActions.handleRequestText(args.prompt);
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
            try {
              return await botActions.handleGetLeadboardRankings();
            } catch (err) {
              console.error(err);
            }
          }
          if (args.subCommand === "weekly") {
            try {
              return await botActions.handleGetWeeklyData();
            } catch (err) {
              console.error(err);
            }
          }
          if (args.subCommand === "kills") {
            try {
              return await botActions.handleGetKillsData();
            } catch (err) {
              console.error(err);
            }
          }
          if (args.subCommand === "damage") {
            try {
              return await botActions.handleGetAverageDamage();
            } catch (err) {
              console.error(err);
            }
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
