import "reflect-metadata";
import axios from "axios";
import { GetTrackedPlayersData } from "./controllers/league.js";
import {
  LEAGUE_ROUTES,
  API_KEY,
  PARTICIPANT_FIELDS,
  POSTGRES_CAMEL_CASE,
} from "./constants.js";
import typeorm from "typeorm";
import { Members } from "./models/Member.js";
import { Games } from "./models/Game.js";
import { Participants } from "./models/Participant.js";
import { CronJob } from "cron";

const populate = async () => {
  const createConnection = typeorm.createConnection;
  const getConnection = typeorm.getConnection;

  // Initialize PostgreSQL
  await createConnection({
    type: "postgres",
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    host: "localhost",
    synchronize: true,
    entities: [Members, Games, Participants],
  });

  // Initialize pull data from League function
  await GetTrackedPlayersData(async (player) => {
    console.log("looping over players...");
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      player.puuid +
      `/ids?start=0&count=100&api_key=${API_KEY}`;

    // Request list of last 100 Match ID's
    const { data } = await axios.get(url);

    const participantFields = PARTICIPANT_FIELDS.map((f) => {
      if (f.match(POSTGRES_CAMEL_CASE)) {
        return `"${f}"`;
      } else {
        return `${f}`;
      }
    }).join(", ");

    // Loop through a count of 100 matches
    let i = 0;
    const getMatches = async () => {
      setTimeout(async () => {
        console.log("initializing...", i);
        // URL for Requesting Last Match Data
        const matchById =
          LEAGUE_ROUTES.MATCH_BY_ID + data[i] + `/?api_key=${API_KEY}`;

        // Request Last Match Data
        const { data: matchData } = await axios.get(matchById);

        // Post to DB if it's Ranked Solo & 2022
        if (
          matchData.info.queueId === 420 &&
          matchData.info.gameStartTimestamp > 1640995200
        ) {
          // Filter by Specific Player in "Parent Loop"
          const participantInfo = matchData.info.participants.filter(
            (p) => p.summonerName === player.userName
          )[0];

          console.log(`${player.userName}: Game `, i + 1);

          // Push only the values of the fields that I've selected in DB
          let values = [];
          for (const [key, value] of Object.entries(participantInfo)) {
            if (PARTICIPANT_FIELDS.includes(key)) {
              if (typeof value === "string") {
                values.push(`'${value}'`);
              }
              if (typeof value === "object") {
                values.push(`'NONE'`);
              }
              if (typeof value === "boolean" || typeof value === "number") {
                values.push(value);
              }
            }
          }

          // Insert SQL Query
          const sql = `INSERT INTO participant (${participantFields}) VALUES (${values.join(
            ", "
          )});`;
          await getConnection().query(sql);
        }
        i++;
        if (i < data.length) {
          console.log("running again...");
          getMatches();
        }
      }, 30000);
    };
    getMatches();
  });
};

populate().catch((err) => {
  console.error(err.statusText);
});
