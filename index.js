import express from "express";
import Discord from "discord.js";
import { config } from "./config.js";
import league from "./routes/league.js";
import { BOT_PREFIX } from "./constants.js";
import { Bot } from "./controllers/bot.js";
import { getUser, userNameSpecialInteractions } from "./utils/bot/userNameSpecialInteractions.js";
import { getRandomIndex } from "./utils/getRandomIndex.js";
import { leagueUsername } from "./utils/bot/leagueUsername.js";
import { GetPlayerMatchHistory } from "./controllers/league.js";
import { INSULTS } from "./utils/bot/insults.js"

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
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    } else {
      const splitMessage = msg.content.split(BOT_PREFIX);
      if (splitMessage[1].trim() === leagueUsername(splitMessage[1].trim()).userName) {
        const user = leagueUsername(splitMessage[1].trim());
        const matchData = await GetPlayerMatchHistory(user.puuid, user.userName);
        return msg.reply(
          `asere ${splitMessage[1].trim()} ${INSULTS[getRandomIndex(INSULTS.length)]}. Estaba jugando ${matchData.championName} ${matchData.teamPosition} y lo mataron ${
            matchData.deaths
          } veces.`
        );
      }
      if (
        msg.author.username === getUser(msg.author.username) &&
        getRandomIndex(10) < 3
      ) {
        return msg.reply(userNameSpecialInteractions(msg.author.username));
      } else {
        return msg.reply(Bot(splitMessage[1].trim()));
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
