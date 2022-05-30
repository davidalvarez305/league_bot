import Discord from "discord.js";
import { BotController } from "./controllers/bot.js";
import { GetTrackedPlayersData } from "./actions/league.js";
import { CronJob } from "cron";
import { BOT_TOKEN, BOT_PREFIX } from "./constants.js";
import { AppDataSource } from "./db/db.js";

const main = async () => {
  AppDataSource.initialize().catch(console.error);

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
      // Initialize pull data from League function
      await GetTrackedPlayersData(discordClient);
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
