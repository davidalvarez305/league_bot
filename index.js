import "reflect-metadata";
import axios from "axios";
import Discord from "discord.js";
import { BotController } from "./controllers/bot.js";
import { GetTrackedPlayersData } from "./controllers/league.js";
import { CronJob } from "cron";
import {
  LEAGUE_ROUTES,
  API_KEY,
  CUCU_GUILD_ID,
  BOT_TOKEN,
} from "./constants.js";
import { lastGameCommentary } from "./utils/bot/lastGameCommentary.js";
import { BOT_PREFIX } from "./constants.js";
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
    logging: true,
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
      // Log at what time in 24-hour clock the cron job was run (( EST ))
      console.log(
        `running cron job at ${((Date.now() / (1000 * 60 * 60)) % 24) - 5}`
      );

      // Initialize pull data from League function
      await GetTrackedPlayersData(async (player) => {
        // RIOT Games API URL for Pulling Match ID's
        const url =
          LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
          player.puuid +
          `/ids?start=0&count=3&api_key=${API_KEY}`;

        // Request list of last 20 Match ID's
        const { data } = await axios.get(url).catch(console.error);

        // Get the match ID from the last game played
        const lastMatch = data[0];

        // Check if Match Exists & Insert if Not
        const lastMatchId = await getConnection().query(
          `SELECT "matchId" FROM participant AS p WHERE p."summonerName" = '${player.userName}' ORDER BY p.id DESC LIMIT 1;`
        );
        console.log('lastMatchId: ', lastMatchId)
        const exists = lastMatchId.matchId === lastMatch;

        if (!exists) {
          await axios
            .get(matchById)
            .then(async (response) => {
              if (response.data.info.queueId === 420) {

                // Match Commentary
                const discordGuild = await discordClient.guilds.fetch(
                  "130528155281653760"
                );

                // Find the ID of the Discord User
                const foundUser = await discordGuild.members.search({
                  query: player.discordUsername,
                });
    
                // Tag Discord user in the commentary
                const discordUser = foundUser.values().next().value.user.id;
                discordClient.channels
                  .fetch(CUCU_GUILD_ID)
                  .then((channel) =>
                    channel.send(
                      lastGameCommentary(response.data, player.userName, discordUser)
                    )
                  );

                // Filter by Specific Player in "Parent Loop"
                const participantInfo = response.data.info.participants.filter(
                  (p) => p.summonerName === player.userName
                )[0];

                // Push only the values of the fields that I've selected in DB
                let values = [];
                values.push(response.data.info.gameStartTimestamp);
                values.push(`'${response.data.metadata.matchId}'`);
                for (const [key, value] of Object.entries(participantInfo)) {
                  if (PARTICIPANT_FIELDS.includes(key)) {
                    if (typeof value === "string") {
                      values.push(`'${value}'`);
                    }
                    if (typeof value === "object") {
                      values.push(`'NONE'`);
                    }
                    if (
                      typeof value === "boolean" ||
                      typeof value === "number"
                    ) {
                      values.push(value);
                    }
                  }
                }

                if (values.length === PARTICIPANT_FIELDS.length) {
                  // Insert SQL Query
                  const sql = `INSERT INTO participant (${participantFields}) VALUES (${values.join(
                    ", "
                  )});`;
                  await getConnection().query(sql);
                }
              }
            })
            .catch(console.error);
        }
      });
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
