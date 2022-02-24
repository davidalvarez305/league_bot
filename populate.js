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
import { Participants } from "./models/Participant.js";

const populate = async () => {
  const createConnection = typeorm.createConnection;
  const getConnection = typeorm.getConnection;

  // Initialize PostgreSQL
  await createConnection({
    type: "postgres",
    username: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    host: "localhost",
    synchronize: true,
    entities: [Members, Participants],
  });

  const populateDatabase = async (qty) => {
    return new Promise(async (resolve) => {
      // Initialize pull data from League function
      await GetTrackedPlayersData(async (player) => {
        console.log("looping over players...");
        // RIOT Games API URL for Pulling Match ID's
        const url =
          LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
          player.puuid +
          `/ids?start=${qty}&count=20&api_key=${API_KEY}`;

        // Request list of last 100 Match ID's
        const { data } = await axios.get(url).catch(console.error);

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
            // Ensure that the current index of "data" is an actual match ID
            if (String(data[i]).startsWith("NA")) {
              // URL for Requesting Last Match Data
              const matchById =
                LEAGUE_ROUTES.MATCH_BY_ID + data[i] + `/?api_key=${API_KEY}`;

              // Check if Match ID is in DB
              const DB_MATCH_IDs = await getConnection().query(
                `SELECT "matchId" FROM participant AS p WHERE p."summonerName" = '${player.userName}';`
              );
              const exists = DB_MATCH_IDs.filter(el => el.matchId === data[i]);

              if (exists.length === 0) {
                // Request Last Match Data
                await axios
                  .get(matchById)
                  .then(async (response) => {
                    if (
                      response.data.info.queueId === 420 &&
                      response.data.info.gameStartTimestamp > 1640995200
                    ) {
                      // Filter by Specific Player in "Parent Loop"
                      const participantInfo =
                        response.data.info.participants.filter(
                          (p) => p.summonerName === player.userName
                        )[0];

                      // Push only the values of the fields that I've selected in DB
                      let values = [];
                      values.push(response.data.info.gameStartTimestamp);
                      values.push(`'${response.data.metadata.matchId}'`);

                      if (player.userName === "andysilva100") {
                        console.log(`Game `, i + 1);
                        console.log(`matchId `, response.data.metadata.matchId);
                      }

                      for (const [key, value] of Object.entries(
                        participantInfo
                      )) {
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
            }
            i++;
            if (i < data.length) {
              getMatches();
            }
            if (i === data.length) {
              resolve(true);
            }
          }, 30000);
        };
        getMatches();
      });
    });
  };

  let qty = 0;
  while (qty < 20) {
    console.log("qty: ", qty);
    await populateDatabase(qty).then((res) => {
      console.log("Increasing...");
      if (res) {
        qty += 20;
      }
    });
  }
};

populate().catch((err) => {
  console.error(err);
});
