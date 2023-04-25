import { Bot } from "./controllers/Bot";
import { Tracker } from "./controllers/Tracker";
import { BOT_TOKEN, BOT_PREFIX, __prod__, PLAYER_NAMES } from "./constants";
import { AppDataSource } from "./db/db";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { createPlayerFactory } from "./utils/createPlayerFactory";

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
  const players = PLAYER_NAMES.map((player) => createPlayerFactory(player));
  const tracker = new Tracker(players, discordClient);

  discordClient.on("ready", async () => {
    try {
      await tracker.startLoop();
    } catch (err) {
      console.error(err);
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
