import { Bot } from "./controllers/Bot";
import { GetTrackedPlayersData } from "./actions/league";
import { CronJob } from "cron";
import { BOT_TOKEN, BOT_PREFIX, __prod__ } from "./constants";
import { AppDataSource } from "./db/db";
import { Client, Events, GatewayIntentBits } from "discord.js";

const main = async () => {
  AppDataSource.initialize().catch(console.error);

  // Initialize discord client
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  // Initialize bot
  const bot = new Bot(discordClient);

  discordClient.on("ready", () => {
    console.log('__prod__: ', __prod__);
    // Start cron job at 30 second interval
    const cronJob = new CronJob("*/75 * * * * *", async () => {
      await GetTrackedPlayersData(discordClient);
    });

    // Only run this code while in production
    if (__prod__) {
      cronJob.start();
    }
  });

  // Respond to lobby messages
  discordClient.on(Events.MessageCreate, async (msg) => {
    // Check if the lobby message has the prefix $asere
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    }

    try {
      await bot.handleMessage(msg);
    } catch (err) {
      console.error(err);
    }
  });

  // Connect BOT
  discordClient.login(BOT_TOKEN);
};

main().catch((err) => {
  console.error(err);
});
