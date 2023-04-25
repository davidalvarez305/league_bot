import { Client } from "discord.js";
import { Player as PlayerType, PlayerStats } from "../types/types";
import { GameInfo } from "../types/game";
import { handleLeagueGetPlayerUserData } from "../actions/league";
import { AppDataSource } from "../db/db";
import { Participant } from "../models/Participant";
import axios from "axios";
import { LEAGUE_ROUTES, API_KEY } from "../constants";
import { MatchData } from "../types/types";
import { getDiscordUser } from "../utils/getDiscordUser";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary";
import { GameAnalysis } from "./GameAnalysis";
import { Commentary } from "./Commentary";

interface TrackedPlayer extends PlayerType {
  lastGame: GameInfo;
  currentStats: PlayerStats;
  last10Games: boolean[];
}

export class Player {
  player: TrackedPlayer;
  summonerName: string;
  repo = AppDataSource.getRepository(Participant);

  constructor(summonerName: string) {
    this.summonerName = summonerName;
  }

  public async GetLastMatchData(discordClient: Client<boolean>) {
    // RIOT Games API URL for Pulling Match ID's
    const url =
      LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID +
      this.player.puuid +
      `/ids?start=0&count=3&api_key=${API_KEY}`;

    try {
      // Request list of last 3 Match ID's
      const results: { data: MatchData } = await axios.get(url);
      const { data } = results;

      // Get the match ID from the last game played
      const lastMatch = data[0];

      // Check if Match Exists & Insert if Not
      const exists = await this.repo.query(
        `SELECT EXISTS(SELECT "matchId" FROM participant WHERE "matchId" = '${lastMatch}' AND "summonerName" = '${this.player.userName}');`
      );

      if (exists[0]["exists"]) return;

      // URL for Requesting Last Match Data
      const matchById =
        LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

      const response: { data: GameInfo } = await axios.get(matchById);

      // We only care about ranked games
      if (response.data.info.queueId !== 420) return;

      const discordUser = await getDiscordUser(
        discordClient,
        this.player.discordUsername
      );

      if (!discordUser) return;

      /* "1062772832658010213" */
      const channel = (await discordClient.channels.fetch(
        String(process.env.CUCU_GUILD_ID)
      )) as any;

      if (!channel) return;

      // Filter by Specific Player in "Parent Loop"
      const currentPlayerPerformance = response.data.info.participants.filter(
        (p) => p.summonerName === this.player.userName
      )[0];

      const game = new GameAnalysis(response.data, this);
      const commentary = new Commentary(game, this, discordUser);
      const msg = await commentary.gameCommentary();

      if (msg) channel.send(msg);

      const { perks, ...gameData } = currentPlayerPerformance;

      let participantData = {
        matchId: `${response.data.metadata.matchId}`,
        timeStamp: response.data.info.gameStartTimestamp,
        perks: JSON.stringify(perks),
        ...gameData,
      };

      await this.repo.save(participantData);
    } catch (err) {
      console.error(err);
    }
  }

  public async getCurrentPlayerStats() {
    try {
      const playerStats = await handleLeagueGetPlayerUserData(
        this.summonerName
      );
      return playerStats;
    } catch (err) {
      throw new Error(err as any);
    }
  }
}
