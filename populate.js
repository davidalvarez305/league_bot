import "reflect-metadata";
import axios from "axios";
import { GetTrackedPlayersData } from "./controllers/league.js";
import { LEAGUE_ROUTES, API_KEY, PARTICIPANT_FIELDS, POSTGRES_CAMEL_CASE } from "./constants.js";
import typeorm from "typeorm";
import { Members } from "./models/Member.js";

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
    logging: true,
    entities: [Members, Games, Participants],
  });

  // Initialize pull data from League function
  await GetTrackedPlayersData(async (player) => {
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      player.puuid +
      `/ids?start=0&count=1&api_key=${API_KEY}`;

    // Request list of last 100 Match ID's
    const { data } = await axios.get(url);

    const participantFields = PARTICIPANT_FIELDS.map((f) => {
        if (f.match(POSTGRES_CAMEL_CASE)) {
            return `"${f}"`
        } else {
            return `${f}`
        }
    }).join(", ");

    // Loop through a count of 100 matches
    data.map(async (match) => {
      // URL for Requesting Last Match Data
      const matchById =
        LEAGUE_ROUTES.MATCH_BY_ID + match + `/?api_key=${API_KEY}`;

      // Request Last Match Data
      const { data: matchData } = await axios.get(matchById);

      const participantInfo = matchData.info.participants.filter(
        (p) => p.summonerName === player.userName
      )[0]

      let values = [];
      for (const [key, value] of Object.entries(participantInfo)) {
        if (PARTICIPANT_FIELDS.includes(key)) {
            if (typeof value === "string") {
                values.push(`'${value}'`)
            }
            if (typeof value === "object") {
                values.push(`'NONE'`)
            }
            if (typeof value === "boolean" || typeof value === "number") {
                values.push(value);
            }
        }
      }

      const sql = `INSERT INTO participant (${participantFields}) VALUES (${values.join(", ")});`;

      await getConnection().query(sql);
    });
  });
};

populate().catch((err) => {
  console.error(err);
});
