import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import { EmbedBuilder } from "discord.js";
import { handleRequestImage, handleRequestText } from "../actions/ai.js";

export class Bot {
  constructor(discordClient) {
    this.discordClient = discordClient;
  }

  handleBotResponse(msg, response) {
    return msg.reply(response);
  }

  async handleMessage(msg) {
    const args = parseCommands(msg);
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
          response = await handleRequestImage(args.prompt);
          break;
        case "text":
          response = await handleRequestText(args.prompt);
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
          if (args.subCommand === "rank") {
            const botResponse = await handleGetLeagueUserData(
              args.player.userName,
              discordUser
            );
            response = botResponse;
            break;
          } else if (args.subCommand === "champions") {
            const botResponse = await handleChampionData(
              args.player.userName
            );
            response = botResponse;
            break;
          } else {
            response = await handleGetLastMatchData(
              args.player.userName,
              discordUser
            );
            break;
          }
        case "statistic":
          if (args.subCommand === "leaderboard") {
            response = await handleGetLeadboardRankings();
            break;
          }
          if (args.subCommand === "weekly") {
            response = await handleGetWeeklyData();
            break;
          }
          if (args.subCommand === "kills") {
            response = await handleGetKillsData();
            break;
          }
          if (args.subCommand === "damage") {
            response = await handleGetAverageDamage();
            break;
          }
          if (args.subCommand === "wins") {
            response = await handleGetWinsData();
            break;
          }
          if (args.subCommand === "multi") {
            response = await handleMultiData();
            break;
          }
          if (args.subCommand === "time") {
            response = await handleTimePlayed();
            break;
          }
          if (args.subCommand === "surrender") {
            response = await handleRageQuits();
            break;
          }
          if (args.subCommand === "duo") {
            response = await handleDuo();
            break;
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
