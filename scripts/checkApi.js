import Discord from "discord.js";
import { config } from "../config.js";
import { GetTrackedPlayersData } from "../controllers/league.js";
import axios from "axios";
import { LEAGUE_ROUTES, API_KEY, CUCU_GUILD_ID } from "../constants.js";
import { commentary } from "../utils/bot/commentary.js";

const checkApi = async () => {
  // Initialize client
  const discordClient = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  // Log that the bot has started
  discordClient.on("ready", async () => {
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
      if (userData && secondsElapsed < 80) {
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

  // Connect BOT
  discordClient.login(config.BOT_TOKEN);
};

await checkApi();
