import express from "express";
import Discord from "discord.js";
import { config } from "./config.js";
import league from "./routes/league.js";
import { BOT_PREFIX } from "./constants.js";
import { Bot } from "./controllers/bot.js";
import {
  getUser,
  userNameSpecialInteractions,
} from "./utils/bot/userNameSpecialInteractions.js";
import { getRandomIndex } from "./utils/getRandomIndex.js";
import { leagueUsername } from "./utils/bot/leagueUsername.js";
import { getLastMatchData } from "./actions/bot.js";

const main = async () => {
  // Middlewares
  const app = express();
  app.use(express.json());

  // Initialize client
  const discordClient = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  // Log that the bot has started
  discordClient.on("ready", () => {
    console.log("The bot is running.");
  });

  // Send a response based on user input
  discordClient.on("messageCreate", async (msg) => {
    console.log(msg.channelId)
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    } else {
      const command = msg.content.split(BOT_PREFIX)[1].trim();
      const summonerName = leagueUsername(command)
      switch (true) {
        case command.toLowerCase() === summonerName.userName.toLowerCase(): {
          const discordGuild = await discordClient.guilds.fetch("130528155281653760");
          const foundUser = await discordGuild.members.search({
            query: summonerName.discordUsername,
          });
          const discordUser = foundUser.values().next().value.user.id;
          const response = await getLastMatchData(command, discordUser)
          return msg.reply(response);
        }
        case msg.author.username === getUser(msg.author.username) &&
          getRandomIndex(10) < 3: {
          return msg.reply(userNameSpecialInteractions(msg.author.username));
        }
        default:
          return msg.reply(Bot(command));
      }
    }
  });

  // Connect BOT
  discordClient.login(config.BOT_TOKEN);

  // API Routes
  app.use("/api/matches", league);

  app.listen(config.PORT, () => {
    console.log(`Express is running on PORT: ${config.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
