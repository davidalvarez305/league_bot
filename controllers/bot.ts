import { GREETINGS, WRONG_COMMAND } from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { formatHelpMessage } from "../utils/bot/formatHelpMessage.js";
import { getDiscordUser } from "../utils/getDiscordUser.js";
import {
  Client,
  EmbedBuilder,
  Message,
  MessagePayload,
  MessageReplyOptions,
} from "discord.js";
import { handleRequestText } from "../actions/ai.js";
import {
  handleLeagueChampionData,
  handleLeagueDuo,
  handleLeagueGetAverageDamage,
  handleLeagueGetKillsData,
  handleLeagueGetLast7DaysData,
  handleLeagueGetPlayerLastMatchData,
  handleLeagueGetWinsData,
  handleLeagueMultiData,
  handleLeagueRageQuits,
  handleLeagueTimePlayed,
} from "actions/league";

import {
  handleGetLeadboardRankings,
  handleGetLeagueUserData,
  parseBotCommands,
} from "actions/bot";

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
            const botResponse = await handleLeagueChampionData(
              args.player!.userName
            );
            response = botResponse;
            break;
          } else {
            response = await handleLeagueGetPlayerLastMatchData(
              args.player!.userName
            );
            break;
          }
        case "statistic":
          if (args.subCommand === "leaderboard") {
            response = await handleGetLeadboardRankings();
            break;
          }
          if (args.subCommand === "weekly") {
            response = await handleLeagueGetLast7DaysData();
            break;
          }
          if (args.subCommand === "kills") {
            response = await handleLeagueGetKillsData();
            break;
          }
          if (args.subCommand === "damage") {
            response = await handleLeagueGetAverageDamage();
            break;
          }
          if (args.subCommand === "wins") {
            response = await handleLeagueGetWinsData();
            break;
          }
          if (args.subCommand === "multi") {
            response = await handleLeagueMultiData();
            break;
          }
          if (args.subCommand === "time") {
            response = await handleLeagueTimePlayed();
            break;
          }
          if (args.subCommand === "surrender") {
            response = await handleLeagueRageQuits();
            break;
          }
          if (args.subCommand === "duo") {
            response = await handleLeagueDuo();
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
      throw new Error(err);
    }

    if (response) this.handleBotResponse(msg, response as any);
  }
}
