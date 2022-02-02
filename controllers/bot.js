import {
  greetingsCommands,
  GREETINGS,
  WRONG_COMMAND,
} from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import {
  getLeagueUserData,
  getLastMatchData,
  getLeaderboardRankings,
} from "../actions/bot.js";
import { isCommandUsername } from "../utils/isCommandUsername.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { MessageEmbed } from "discord.js";
import { BOT_PREFIX, RANK_COMMAND } from "../constants.js";

export const BotController = async (msg, discordClient) => {
  // The command is whatever comes after '$asere'
  const command = msg.content.split(BOT_PREFIX)[1].trim();

  // Identify type of command
  const discordMember = leagueUsername(command.split(" ")[0]);

  // Match the Discord ID to the 'CuCu Discord'
  const discordGuild = await discordClient.guilds.fetch("130528155281653760");

  if (discordMember.userName.length > 0) {
    // Pull the Discord User ID for tagging purposes
    const foundUser = await discordGuild.members.search({
      query: discordMember.discordUsername,
    });
    const discordUser = foundUser.values().next().value.user.id;

    switch (true) {
      case !!msg.content.match(RANK_COMMAND): {
        // The bot's response
        const botResponse = await getLeagueUserData(
          discordMember.userName,
          discordUser
        );
        return botResponse;
      }

      // Compare the lowercased username so that for ex iDecimo and idecimo both map to the same player
      case isCommandUsername(command): {
        // Tag the user in the response
        const response = await getLastMatchData(
          discordMember.userName,
          discordUser
        );
        return response;
      }
      default:
        return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
    }
  } else {
    switch (true) {
      case command === "leaderboard": {
        // Pull player's data and rank them
        const players = await getLeaderboardRankings();
        const rankings = rankPlayersAlgo(players);

        // Format message & send to Discord client
        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Leaderboard")
          .setDescription("Current Rankings of Discord Members")
          .addFields(formatMessage(rankings));

        return { embeds: [embed] };
      }
      case greetingsCommands(msg): {
        return GREETINGS[getRandomIndex(GREETINGS.length)];
      }
      default:
        return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
    }
  }
};
