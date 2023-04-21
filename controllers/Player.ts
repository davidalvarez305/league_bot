import { Client } from "discord.js";
import { Player as PlayerType, PlayerStats } from "../types/types";
import { GameInfo, Participant } from "../types/game";
import { handleLeagueGetPlayerUserData } from "../actions/league";

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

  constructor(summonerName: string) {
    this.summonerName = summonerName;
  }

  public async GetTrackedPlayersData(discordClient: Client<boolean>) {
    if (!currentGame.win) {
      const currentStats = await this.getCurrentPlayerStats();
    }
  }

  public isDeranked(updatedStats: PlayerStats): boolean {
    return (
      LEAGUE_RANKS[this.player.currentStats.rank] <
      LEAGUE_RANKS[updatedStats.rank]
    );
  }

  private isOnLosingStreak() {}

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
