import Discord from "discord.js";
import { config } from "../config.js";
export const Bot = () => {

  // Initialize client
  const discordClient = Discord.Client();

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
};
