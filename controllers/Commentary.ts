import { LEAGUE_RANKS } from "../constants";
import { GameInfo, Participant } from "../types/game";
import { Player } from "./Player";

export class Commentary {
  data: GameInfo;
  discordUser: string;
  player: Player;

  constructor(data: GameInfo, discordUser: string, player: Player) {
    this.data = data;
    this.discordUser = discordUser;
    this.player = player;
  };

  isTopDamage() {}
  isLastDamage() {}
  isMostKills() {}
  diedMoreThan10Times() {}
  gotMoreThan15Kills() {}
  didMoreThan40KDamage() {}
  gotPentaKill() {}
  isYuumi() {}
  isTeemo() {}

  public async isDeranked(currentGame: Participant): Promise<boolean> {
    if (!currentGame.win) {
      try {
        const updatedStats = await this.player.getCurrentPlayerStats();
        const answer = LEAGUE_RANKS[this.player.player.currentStats.rank] < LEAGUE_RANKS[updatedStats.rank];
        this.player.player.currentStats = updatedStats;
      return answer;
      } catch (err) {
        throw new Error(err as any);
      }
    }
    return false;
  };

  private isOnLosingStreak() {
    return this.player.player.last10Games.filter(game => game).length >= 6;
  }
}
