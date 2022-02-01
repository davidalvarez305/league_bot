import axios from "axios";
import Discord, { MessageEmbed } from "discord.js";
import { Bot } from "./controllers/bot.js";
import { leagueUsername } from "./utils/bot/leagueUsername.js";
import { GetTrackedPlayersData } from "./controllers/league.js";
import { getLastMatchData, getLeaderboardRankings, getLeagueUserData } from "./actions/bot.js";
import { CronJob } from "cron";
import {
  LEAGUE_ROUTES,
  API_KEY,
  CUCU_GUILD_ID,
  BOT_TOKEN,
  BOT_PREFIX,
  RANK_COMMAND,
} from "./constants.js";
import { commentary } from "./utils/bot/commentary.js";
import { rankPlayersAlgo } from "./utils/rankPlayersAlgo.js";
import { formatMessage } from "./utils/bot/formatMessage.js";
import { isCommandUsername } from "./utils/isCommandUsername.js";
import { lastGameCommentary } from "./utils/bot/lastGameCommentary.js";

const main = async () => {
  // Initialize client
  const discordClient = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  // Log that the bot has started
  discordClient.on("ready", () => {
    // Start cron job at 30 second interval
    const cronJob = new CronJob("*/30 * * * * *", async () => {
      // Log at what time in 24-hour clock the cron job was run (( EST ))
      console.log(
        `running cron job at ${((Date.now() / (1000 * 60 * 60)) % 24) - 5}`
      );

      // Initialize pull data from League function
      await GetTrackedPlayersData(async (player) => {
        // RIOT Games API URL for Pulling Match ID's
        const url =
          LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
          player.puuid +
          `/ids?start=0&count=20&api_key=${API_KEY}`;

        // Request list of last 20 Match ID's
        const { data } = await axios.get(url);

        // Get the match ID from the last game played
        const lastMatch = data[0];

        // URL for Requesting Last Match Data
        const matchById =
          LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

        // Request Last Match Data
        const { data: matchData } = await axios.get(matchById);

        // Get the time of when the league data came back
        const rightNow = Date.now();

        // Calculate how much time has elapsed from right now and the time the last game ended
        const secondsElapsed =
          (rightNow - matchData.info.gameEndTimestamp) / 1000;
        const discordGuild = await discordClient.guilds.fetch(
          "130528155281653760"
        );

        // Send game commentary on Discord if the last match happened in the last 10 seconds
        if (matchData && secondsElapsed < 45) {
          // Find the ID of the Discord User
          const foundUser = await discordGuild.members.search({
            query: player.discordUsername,
          });

          // Tag Discord user in the commentary
          const discordUser = foundUser.values().next().value.user.id;
          discordClient.channels
            .fetch(CUCU_GUILD_ID)
            .then((channel) =>
              channel.send(lastGameCommentary(matchData, player.userName, discordUser))
            );
        }
      });
    });
    cronJob.start();
  });

  // Send a response based on user input
  discordClient.on("messageCreate", async (msg) => {
    // Check if the lobby message has the prefix $asere
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    } else {
      // The command is whatever comes after '$asere'
      const command = msg.content.split(BOT_PREFIX)[1].trim();

      // Identify type of command
      const discordMember = leagueUsername(command.split(" ")[0]);

      // Match the Discord ID to the 'CuCu Discord'
      const discordGuild = await discordClient.guilds.fetch(
        "130528155281653760"
      );

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
            return msg.reply(botResponse);
          }

          // Compare the lowercased username so that for ex iDecimo and idecimo both map to the same player
          case isCommandUsername(command): {
            // Tag the user in the response
            const response = await getLastMatchData(discordMember.userName, discordUser);
            return msg.reply(response);
          }
          default:
            return msg.reply(Bot(command));
        }
      } else {
        switch (true) {
          case command === "leaderboard": {

            // Pull player's data and rank them
            const players = await getLeaderboardRankings()
            const rankings = rankPlayersAlgo(players);

            // Format message & send to Discord client
            const embed = new MessageEmbed()
            .setColor('DARK_BLUE')
            .setTitle('League of Legends Leaderboard')
            .setDescription('Current Rankings of Discord Members')
            .addFields(formatMessage(rankings))

            return msg.reply({ embeds: [embed] })
          }
          default:
            return msg.reply(Bot(command));
        }
      }
    }
  });

  // Connect BOT
  discordClient.login(BOT_TOKEN);
};

main().catch((err) => {
  console.error(err);
});
