import axios from "axios";
import Discord from "discord.js";
import { config } from "./config.js";
import { BOT_PREFIX } from "./constants.js";
import { Bot } from "./controllers/bot.js";
import { leagueUsername } from "./utils/bot/leagueUsername.js";
import { GetTrackedPlayersData } from "./controllers/league.js";
import { getLastMatchData } from "./actions/bot.js";
import { CronJob } from "cron";
import { LEAGUE_ROUTES, API_KEY, CUCU_GUILD_ID } from "./constants.js";
import { commentary } from "./utils/bot/commentary.js";

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
    const cronJob = new CronJob("*/30 * * * * *", async () => {
      console.log(
        `executing cron job at ${((Date.now() / (1000 * 60 * 60)) % 24) - 5}`
      );
      await GetTrackedPlayersData(async (player) => {
        const url =
          LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
          player.puuid +
          `/ids?start=0&count=20&api_key=${API_KEY}`;
        const { data } = await axios.get(url);
        const lastMatch = data[0];
        const matchById =
          LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;
        const { data: matchData } = await axios.get(matchById);
        const rightNow = Date.now();
        const secondsElapsed =
          (rightNow - matchData.info.gameEndTimestamp) / 1000;
        const discordGuild = await discordClient.guilds.fetch(
          "130528155281653760"
        );
        const userData = matchData.info.participants.filter((p) => {
          return Object.values(p).some((val) =>
            val.toString().includes(player.userName)
          );
        });
        if (userData && secondsElapsed < 20) {
          const foundUser = await discordGuild.members.search({
            query: player.discordUsername,
          });
          const discordUser = foundUser.values().next().value.user.id;
          discordClient.channels
            .fetch(CUCU_GUILD_ID)
            .then((channel) =>
              channel.send(commentary(userData[0], discordUser))
            );
        }
      });
    });
    cronJob.start();
  });

  // Send a response based on user input
  discordClient.on("messageCreate", async (msg) => {
    if (!msg.content.match(BOT_PREFIX)) {
      return;
    } else {
      const command = msg.content.split(BOT_PREFIX)[1].trim();
      const summonerName = leagueUsername(command);
      switch (true) {
        case command.toLowerCase() === summonerName.userName.toLowerCase(): {
          const discordGuild = await discordClient.guilds.fetch(
            "130528155281653760"
          );
          const foundUser = await discordGuild.members.search({
            query: summonerName.discordUsername,
          });
          const discordUser = foundUser.values().next().value.user.id;
          const response = await getLastMatchData(command, discordUser);
          return msg.reply(response);
        }
        default:
          return msg.reply(Bot(command));
      }
    }
  });

  // Connect BOT
  discordClient.login(config.BOT_TOKEN);
};

main().catch((err) => {
  console.error(err);
});
