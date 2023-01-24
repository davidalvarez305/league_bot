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
          response = aiActions.handleRequestImage(args.prompt);
          break;
        case "text":
          response = aiActions.handleRequestText(args.prompt);
          break;
        case "greeting":
          response = GREETINGS[getRandomIndex(GREETINGS.length)];
          break;
        case "player":
          try {
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
              const res = await botActions.handleGetLastMatchData(
                args.player.userName,
                discordUser
              );
              response = res;
              break;
            }
          } catch (err) {
            console.error(err);
            break;
          }
        case "statistic":
          if (args.subCommand === "leaderboard") {
            try {
              response = await botActions.handleGetLeadboardRankings();
              break;
            } catch (err) {
              console.error(err);
              break;
            }
          }
          if (args.subCommand === "weekly") {
            try {
              response = await botActions.handleGetWeeklyData();
              break;
            } catch (err) {
              console.error(err);
              break;
            }
          }
          if (args.subCommand === "kills") {
            try {
              response = await botActions.handleGetKillsData();
              break;
            } catch (err) {
              console.error(err);
              break;
            }
          }
          if (args.subCommand === "damage") {
            try {
              response = await botActions.handleGetAverageDamage();
              break;
            } catch (err) {
              console.error(err);
              break;
            }
          }
          if (args.subCommand === "wins") {
            console.log(args);
            try {
              response = await botActions.handleGetWinsData();
              break;
            } catch (err) {
              console.error(err);
              break;
            }
          }
        default:
          response = WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
          break;
      }
    } catch (err) {
      console.error(err);
    }

    if (response) this.handleBotResponse(msg, response);
  }
}
