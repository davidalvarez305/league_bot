import axios from "axios";
import { API_KEY, PLAYER_NAMES, LEAGUE_ROUTES } from "../constants";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary";
import { getDiscordUser } from "../utils/getDiscordUser";
import { Participant } from "../models/Participant";
import { AppDataSource } from "../db/db";
import possibleDuos from "../utils/possibleDuos";
import {
  AverageGameData,
  ChampionData,
  DuoData,
  KillsData,
  MatchData,
  MultiData,
  PlayerDetailsResponse,
  PlayerStats,
  RageQuitsData,
  TimePlayedData,
  WeeklyData,
  WinData,
} from "../types/types";
import { GameInfo } from "../types/game";
import { Client } from "discord.js";

const ParticipantRepo = AppDataSource.getRepository(Participant);

export async function handleLeagueGetWinsData(): Promise<WinData[]> {
  try {
    const data = await ParticipantRepo.query(
      `SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        COUNT(*) AS "games",
        COUNT(CASE WHEN win THEN 1 END) / COUNT(*)::decimal AS "win rate",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY COUNT(CASE WHEN win THEN 1 END) DESC;`
    );
    return data;
  } catch (err) {
    throw new Error(err as any);
  }
}

export async function handleLeagueGetPlayerLastMatchData(
  puuid: string
): Promise<GameInfo> {
  try {
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      puuid +
      `/ids?start=0&count=20&api_key=${API_KEY}`;
    const response: { data: MatchData } = await axios.get(url);
    const MATCH_ID =
      LEAGUE_ROUTES.MATCH_BY_ID + response.data[0] + `/?api_key=${API_KEY}`;
    const res: { data: GameInfo } = await axios.get(MATCH_ID);
    return res.data;
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function handleLeagueGetPlayerUserData(
  user: string
): Promise<PlayerStats> {
  try {
    // URL for retrieving the User's ID
    const url = `${LEAGUE_ROUTES.PLAYER_DETAILS}${user}?api_key=${API_KEY}`;
    const response: { data: PlayerDetailsResponse } = await axios.get(url);

    // URL for retrieving the User's League Performance
    const playerStatsUrl = `${LEAGUE_ROUTES.PLAYER_STATS}${response.data.id}?api_key=${API_KEY}`;
    const res: { data: PlayerStats[] } = await axios.get(playerStatsUrl);

    return res.data[0];
  } catch (err) {
    throw new Error(err as any);
  }
}

export async function handleLeagueGetLast7DaysData(): Promise<WeeklyData[]> {
  const LAST_7_DAYS = Date.now() - 604800000;
  try {
    return await ParticipantRepo.query(
      `SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        COUNT(*) AS "games",
        AVG(kills)::decimal AS "kills",
        AVG(deaths)::decimal AS "deaths",
        "summonerName"
        FROM participant
        WHERE "timeStamp" > ${LAST_7_DAYS}
        GROUP BY "summonerName"
        ORDER BY games DESC;`
    );
  } catch (err) {
    throw new Error(err as any);
  }
}

export async function handleLeagueGetKillsData(): Promise<KillsData[]> {
  try {
    return await ParticipantRepo.query(
      `SELECT
        ROUND(AVG(kills)::decimal, 2) AS "kills",
        ROUND(AVG(deaths)::decimal, 2) AS "deaths",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY AVG(kills) DESC;`
    );
  } catch (err) {
    throw new Error(err as any);
  }
}

export async function handleLeagueGetAverageDamage(): Promise<AverageGameData[]> {
  try {
    return await ParticipantRepo.query(
      `SELECT
        ROUND(AVG("totalDamageDealtToChampions")::decimal, 2) AS "totalDamageDealtToChampions",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY AVG("totalDamageDealtToChampions") DESC;`
    );
  } catch (err) {
    throw new Error(err as any);
  }
};

export async function handleLeagueChampionData(userName: string): Promise<ChampionData[]> {
  try {
    return await ParticipantRepo.query(
      `
        SELECT COUNT(CASE WHEN win THEN 1 END) AS "wins",
        ROUND(COUNT(CASE WHEN win THEN 1 END) / COUNT(*)::decimal, 2) AS "win rate",
        COUNT(*) as "games",
        ROUND(AVG("totalDamageDealtToChampions")::decimal, 2) AS "damage",
        ROUND(AVG("kills")::decimal, 2) AS "kills",
        ROUND(AVG("deaths")::decimal, 2) AS "deaths",
        ROUND(AVG("assists")::decimal, 2) AS "assists",
        "championName"
        FROM participant
        where "summonerName" = '${userName}'
        GROUP BY "championName"
        ORDER BY COUNT(*) DESC;
        `
    );
  } catch (err) {
    throw new Error(err as any);
  }
};

export async function handleLeagueMultiData(): Promise<MultiData[]> {
  try {
    return await ParticipantRepo.query(
      `
        SELECT SUM("largestMultiKill") AS "multiKills", SUM("pentaKills") AS "pentaKills", "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY SUM("largestMultiKill") DESC;
        `
    );
  } catch (err) {
    throw new Error(err as any);
  }
};

export async function handleLeagueTimePlayed(): Promise<TimePlayedData[]> {
  try {
    return await ParticipantRepo.query(`
        SELECT SUM("timePlayed") / (60 * 60) AS "timePlayed", "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY SUM("timePlayed") DESC;
      `);
  } catch (err) {
    throw new Error(err as any);
  }
};

export async function handleLeagueRageQuits(): Promise<RageQuitsData[]> {
  try {
    return await ParticipantRepo.query(`
        SELECT COUNT(CASE WHEN "gameEndedInSurrender"  THEN 1 END) AS "rageQuits",
        "summonerName"
        FROM participant
        GROUP BY "summonerName"
        ORDER BY COUNT(CASE WHEN "gameEndedInSurrender"  THEN 1 END) DESC;
      `);
  } catch (err) {
    throw new Error(err as any);
  }
}

interface UniqueGames {
  [key: string]: Participant[]
};

export async function handleLeagueDuo(): Promise<DuoData[]> {
  try {
    const games: Participant[] = await ParticipantRepo.find();
    const duoCombinations = possibleDuos();
    var data = [];
    var uniqueGames: UniqueGames = {};
    var result = [];

    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (!uniqueGames[game["matchId"]]) {
        uniqueGames[game["matchId"]] = [game];
      } else {
        uniqueGames[game["matchId"]] = [...uniqueGames[game["matchId"]], game];
      }
    }

    for (const [_, value] of Object.entries(uniqueGames)) {
      if (value.length === 1) continue;

      let gameData = { players: "", win: false };

      const playerCombination = value[0].summonerName + "/" + value[1].summonerName;

      gameData["players"] = playerCombination;
      gameData["win"] = value[0].win;

      data.push(gameData);
    }

    interface DuoGameData {
      players: string | undefined;
      games: number;
      wins: number;
    }

    for (let i = 0; i < duoCombinations.length; i++) {
      let duoData: DuoGameData = { players: undefined, games: 0, wins: 0 };
      for (let n = 0; n < data.length; n++) {
        if (duoCombinations[i] === data[n]["players"]) {
          duoData["players"] = data[n]["players"];
          duoData["games"] += 1;
          data[n]["win"] ? (duoData["wins"] += 1) : undefined;
        }
      }
      if (duoData["players"]) {
        result.push(duoData);
      }
    }

    return result
      .map((data) => {
        return {
          ...data,
          wr: parseInt(((data["wins"] / data["games"]) * 100).toFixed(2)),
        };
      })
      .sort((a, b) => b.wr - a.wr);
  } catch (err) {
    throw new Error(err as any);
  }
}

export const GetTrackedPlayersData = async (discordClient: Client<boolean>) => {
  // Get the last game data of each tracked player.
  for (let i = 0; i < PLAYER_NAMES.length; i++) {
    const player = PLAYER_NAMES[i];
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      player.puuid +
      `/ids?start=0&count=3&api_key=${API_KEY}`;

    try {
      // Request list of last 20 Match ID's
      const results = await axios.get(url);
      const { data } = results;

      // Get the match ID from the last game played
      const lastMatch = data[0];

      // Check if Match Exists & Insert if Not
      const exists = await ParticipantRepo.query(
        `SELECT EXISTS(SELECT "matchId" FROM participant WHERE "matchId" = '${lastMatch}' AND "summonerName" = '${player.userName}');`
      );

      if (exists[0]["exists"]) continue;

      // URL for Requesting Last Match Data
      const matchById =
        LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

      const response: { data: GameInfo } = await axios.get(matchById);

      if (response.data.info.queueId === 420) {
        const discordUser = await getDiscordUser(
          discordClient,
          player.discordUsername
        );

        if (!discordUser) continue;

        const channel = await discordClient.channels.fetch(
          "1062772832658010213"
        ) as any;

        if (!channel) continue;

        const msg = await lastGameCommentary(
          response.data,
          player.userName,
          discordUser
        );

        channel.send(msg);

        // Filter by Specific Player in "Parent Loop"
        const participantInfo = response.data.info.participants.filter(
          (p) => p.summonerName === player.userName
        )[0];

        const { perks, ...gameData } = participantInfo;

        let game = {
          matchId: `${response.data.metadata.matchId}`,
          timeStamp: response.data.info.gameStartTimestamp,
          perks: JSON.stringify(perks),
          ...gameData,
        };

        await ParticipantRepo.save(game);
      }
    } catch (err) {
      console.error(err);
    }
  }
};
