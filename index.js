import axios from "axios";
import Discord from "discord.js";
import { BotController } from "./controllers/bot.js";
import { GetTrackedPlayersData } from "./controllers/league.js";
import { CronJob } from "cron";
import {
  LEAGUE_ROUTES,
  API_KEY,
  CUCU_GUILD_ID,
  BOT_TOKEN,
} from "./constants.js";
import { lastGameCommentary } from "./utils/bot/lastGameCommentary.js";
import { BOT_PREFIX } from "./constants.js";

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
              channel.send(
                lastGameCommentary(matchData, player.userName, discordUser)
              )
            );
        }
      });
    });
    cronJob.start();
  });

  // Respond to lobby messages
  discordClient.on("messageCreate", async (msg) => {

    // Check if the lobby message has the prefix $asere
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    }

    const message = await BotController(msg, discordClient);
    if (message) {
      return msg.reply(message);
    }
  });

  // Connect BOT
  discordClient.login(BOT_TOKEN);
};

main().catch((err) => {
  console.error(err);
});
