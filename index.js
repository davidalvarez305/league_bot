import express from "express";
import Discord from "discord.js";
import { config } from "./config.js";
import league from "./routes/league.js";
import bot from "./routes/bot.js"

const main = async () => {
  // Middlewares
  const app = express();
  app.use(express.json());

  // Initialize client
  const discordClient = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

  // Log that the bot has started
  discordClient.on("ready", () => {
    console.log("The bot is running.");
  });

  // Send a response based on user input
  discordClient.on("message", (msg) => {
    if (msg.content === "$asere que bola") {
      msg.reply("que welta el mio");
    }
  });

  // Connect BOT
  discordClient.login(config.BOT_TOKEN);

  // API Routes
  app.use("/api/matches", league);
  app.use("/bot", bot);

  app.listen(config.PORT, () => {
    console.log(`Express is running on PORT: ${config.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
