import "reflect-metadata";
import axios from "axios";
import {
  LEAGUE_ROUTES,
  API_KEY,
  PARTICIPANT_FIELDS,
  PLAYER_NAMES,
} from "./constants.js";
import { AppDataSource } from "./db/db.js";
import { Participants } from "./models/Participant.js";

const populate = async () => {
  AppDataSource.initialize().catch(console.error);
  const Participant = AppDataSource.getRepository(Participants);

  const populateDatabase = async (qty) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Initialize pull data from League function
        for (let l = 0; l < PLAYER_NAMES.length; l++) {
          const player = PLAYER_NAMES[l];
          // RIOT Games API URL for Pulling Match ID's
          const url = LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID + player.puuid + `/ids?start=${qty}&count=100&api_key=${API_KEY}`;

          // Request list of last 100 Match ID's
          const { data } = await axios.get(url);

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
                const DB_MATCH_IDs = await Participant.query(
                  `SELECT "matchId" FROM participant AS p WHERE p."summonerName" = '${player.userName}';`
                );
                const exists = DB_MATCH_IDs.filter(
                  (el) => el.matchId === data[i]
                );

                if (exists.length === 0) {
                  // Request Last Match Data
                  const response = await axios.get(matchById);
                  if (
                    response.data.info.queueId === 420 &&
                    response.data.info.gameStartTimestamp > 1673427640 // Season 13 Start
                  ) {
                    // Filter by Specific Player in "Parent Loop"
                    const participantInfo =
                      response.data.info.participants.filter(
                        (p) => p.summonerName === player.userName
                      )[0];

                    let game = {};
                    game["timeStamp"] = response.data.info.gameStartTimestamp;
                    game["matchId"] = `${response.data.metadata.matchId}`;
                    for (let i = 0; i < PARTICIPANT_FIELDS.length; i++) {
                      if (PARTICIPANT_FIELDS[i] === "perks") {
                        game[PARTICIPANT_FIELDS[i]] = JSON.stringify(
                          participantInfo[PARTICIPANT_FIELDS[i]]
                        );
                      }
                      game[PARTICIPANT_FIELDS[i]] =
                        participantInfo[PARTICIPANT_FIELDS[i]];
                    }

                    if (game['summonerName'] === 'andysilva100') {
                      console.log(game['summonerName'], `${i}th Game`)
                    }
                    await Participant.save(game);
                  }
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
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  let qty = 0;
  while (qty < 200) {
    console.log("qty: ", qty);
    await populateDatabase(qty).then((res) => {
      console.log("Increasing...");
      if (res) {
        qty += 100;
      }
    });
  }
};

populate().catch((err) => {
  console.error(err);
});
