import { BotActions } from "../actions/bot.js";
import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
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

          response = { embeds: [embed] };
          break;
        case "image":
          response = await aiActions.handleRequestImage(args.prompt);
          break;
        case "text":
          response = await aiActions.handleRequestText(args.prompt);
          break;
        case "greeting":
          response = GREETINGS[getRandomIndex(GREETINGS.length)];
          break;
        case "player":
          const discordUser = await getDiscordUser(
            this.discordClient,
            args.player.discordUsername
          );
          if (!discordUser) {
            response = "User doesn't exist.";
            break;
          }
          if (args.subCommand) {
            const botResponse = await botActions.handleGetLeagueUserData(
              args.player.userName,
              discordUser
            );
            response = botResponse;
            break;
          } else {
            response = await botActions.handleGetLastMatchData(
              args.player.userName,
              discordUser
            );
            break;
          }
        case "statistic":
          if (args.subCommand === "leaderboard") {
            response = await botActions.handleGetLeadboardRankings();
            break;
          }
          if (args.subCommand === "weekly") {
            response = await botActions.handleGetWeeklyData();
            break;
          }
          if (args.subCommand === "kills") {
            response = await botActions.handleGetKillsData();
            break;
          }
          if (args.subCommand === "damage") {
            response = await botActions.handleGetAverageDamage();
            break;
          }
          if (args.subCommand === "wins") {
            response = await botActions.handleGetWinsData();
            break;
          }
        default:
          response = WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
          break;
      }
    } catch (err) {
      throw new Error(err);
    }

    if (response) this.handleBotResponse(msg, response);
  }
}
