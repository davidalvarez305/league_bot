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
  getWeeklyData,
  getKillsData,
} from "../actions/bot.js";
import { isCommandUsername } from "../utils/isCommandUsername.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { MessageEmbed } from "discord.js";
import { BOT_PREFIX, CUCU_GUILD_ID, RANK_COMMAND } from "../constants.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { GetLast7DaysData } from "./league.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";

export const BotController = async (msg, discordClient, getConnection) => {
  // The command is whatever comes after '$asere'
  const command = msg.content.split(BOT_PREFIX)[1].trim();

  // Identify type of command
  const discordMember = leagueUsername(command.split(" ")[0]);

  // Match the Discord ID to the 'CuCu Discord'
  const discordGuild = await discordClient.guilds.fetch(CUCU_GUILD_ID);

  // The reason why this is separated is because if one were to search for an invalid discord member
  // ( ie 'foundUser' variable ) there would be an error.
  // That's why there's an if statement to separate user-lookup and non-user commands.

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
      case command === "weekly": {
        // Get last 7 days data
        const last7Daysdata = await getWeeklyData(getConnection);

        // Format message & send to Discord client
        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatWeeklyRankingsMessage(last7Daysdata));

        return { embeds: [embed] };
      }
      case command === "kills": {
        const killsData = await getKillsData(getConnection);

        // Format message & send to Discord client
        const embed = new MessageEmbed()
          .setColor("DARK_BLUE")
          .setTitle("League of Legends Weekly Ranks")
          .setDescription("Weekly Rankings of Discord Members")
          .addFields(formatKillsMessage(killsData));

        return { embeds: [embed] };
      }
      case greetingsCommands(command): {
        return GREETINGS[getRandomIndex(GREETINGS.length)];
      }
      default:
        return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
    }
  }
};
