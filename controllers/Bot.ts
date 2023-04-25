import {
  Client,
  EmbedBuilder,
  Message,
  MessagePayload,
  MessageReplyOptions,
} from "discord.js";
import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses";
import { getRandomIndex } from "../utils/getRandomIndex";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage";
import { getDiscordUser } from "../utils/getDiscordUser";
import { handleRequestText } from "../actions/ai";
import {
  handleChampionData,
  handleDuo,
  handleGetAverageDamage,
  handleGetKillsData,
  handleGetWeeklyData,
  handleGetLeagueUserData,
  handleGetWinsData,
  handleMultiData,
  handleRageQuits,
  handleTimePlayed,
  handleGetLeadboardRankings,
  parseBotCommands,
} from "../actions/bot";

export class Bot {
  discordClient: Client<boolean>;

  constructor(discordClient: Client<boolean>) {
    this.discordClient = discordClient;
  }

  handleBotResponse(
    msg: Message,
    response: string | MessagePayload | MessageReplyOptions
  ) {
    return msg.reply(response);
  }

  async handleMessage(msg: Message) {
    const args = parseBotCommands(msg);
    let response;

    try {
      switch (args.type) {
        case "help":
          const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setTitle("Command Guide")
            .setDescription("Examples of Commands")
            .addFields(formatHelpMessage() as any);

          response = { embeds: [embed] };
          break;
        case "text":
          if (args.prompt) {
            response = await handleRequestText(args.prompt);
          }
          break;
        case "greeting":
          response = GREETINGS[getRandomIndex(GREETINGS.length)];
          break;
        case "player":
          const discordUser = await getDiscordUser(
            this.discordClient,
            args.player!.discordUsername
          );
          if (!discordUser) {
            response = "User doesn't exist.";
            break;
          }
          if (args.subCommand === "rank") {
            const botResponse = await handleGetLeagueUserData(
              args.player!.userName,
              discordUser
            );
            response = botResponse;
            break;
          } else if (args.subCommand === "champions") {
            const botResponse = await handleChampionData(
              args.player!.userName
            );
            response = botResponse;
            break;
          } else {
            response = await handleGetLeagueUserData(
              args.player!.userName,
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
          response = WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
          break;
        default:
          response = WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
          break;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err as any);
    }

    if (response) this.handleBotResponse(msg, response as any);
  }
}
