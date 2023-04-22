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
import { Participant as ParticipantType } from "../types/game";

const LEAGUE_RANKS = {
  Iron: 0,
  Bronze: 1,
  Silver: 2,
  Gold: 3,
  Platinum: 4,
  Diamond: 5,
  Master: 6,
  GrandMaster: 7,
  Challenger: 8,
};

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
    const url = LEAGUE_ROUTES.PLAYER_MATCH_HISTORY_BY_PUUID + this.player.puuid + `/ids?start=0&count=3&api_key=${API_KEY}`;

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
      const matchById = LEAGUE_ROUTES.MATCH_BY_ID + lastMatch + `/?api_key=${API_KEY}`;

      const response: { data: GameInfo } = await axios.get(matchById);

      // We only care about ranked games
      if (response.data.info.queueId !== 420) return;

      const discordUser = await getDiscordUser(
        discordClient,
        this.player.discordUsername
      );

      if (!discordUser) return;

      const channel = (await discordClient.channels.fetch("1062772832658010213")) as any;

      if (!channel) return;

      // Filter by Specific Player in "Parent Loop"
      const currentPlayerPerformance = response.data.info.participants.filter(
        (p) => p.summonerName === this.player.userName
      )[0];

      const msg = await lastGameCommentary(
        response.data,
        this.player.userName,
        discordUser
      );

      channel.send(msg);

      const { perks, ...gameData } = currentPlayerPerformance;

      let game = {
        matchId: `${response.data.metadata.matchId}`,
        timeStamp: response.data.info.gameStartTimestamp,
        perks: JSON.stringify(perks),
        ...gameData,
      };

      await this.repo.save(game);
    } catch (err) {
      console.error(err);
    }
  }

  public async isDeranked(currentGame: ParticipantType): Promise<boolean> {
    if (!currentGame.win) {
      try {
        const updatedStats = await this.getCurrentPlayerStats();
      return  LEAGUE_RANKS[this.player.currentStats.rank] < LEAGUE_RANKS[updatedStats.rank]
      } catch (err) {
        throw new Error(err as any);
      }
    }
    return false;
  };

  private isOnLosingStreak() {
    return this.player.last10Games.filter(game => game).length >= 6;
  }

  private async getCurrentPlayerStats() {
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
