import "reflect-metadata";
import Discord from "discord.js";
import { BotController } from "./controllers/bot.js";
import { GetTrackedPlayersData } from "./actions/league.js";
import { CronJob } from "cron";
import { BOT_TOKEN, BOT_PREFIX } from "./constants.js";
import typeorm from "typeorm";
import { Members } from "./models/Member.js";
import { Participants } from "./models/Participant.js";

const main = async () => {
  const createConnection = typeorm.createConnection;
  const getConnection = typeorm.getConnection;

  // Initialize PostgreSQL
  await createConnection({
    type: "postgres",
    username: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    host: process.env.PGHOST,
    synchronize: true,
    entities: [Members, Participants],
  });

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
      await GetTrackedPlayersData(discordClient, getConnection);
    });
    cronJob.start();
  });

  // Respond to lobby messages
  discordClient.on("messageCreate", async (msg) => {
    // Check if the lobby message has the prefix $asere
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    }

    const message = await BotController(msg, discordClient, getConnection);
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
