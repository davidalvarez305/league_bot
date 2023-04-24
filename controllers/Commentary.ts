import { LEAGUE_RANKS } from "../constants";
import { GameInfo, Participant } from "../types/game";
import { Player } from "./Player";

export class Commentary {
  data: GameInfo;
  discordUser: string;
  player: Player;
  currentParticipant: Participant | undefined;

  constructor(data: GameInfo, discordUser: string, player: Player) {
    this.data = data;
    this.discordUser = discordUser;
    this.player = player;
  };

  isTopDamage() {
    if (!this.currentParticipant) return;
    const sorted = this.data.info.participants.sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions);
    return sorted[0].summonerName = this.player.summonerName;
  };

  isLastDamage() {
    if (!this.currentParticipant) return;
    const sorted = this.data.info.participants.sort((a, b) => a.totalDamageDealtToChampions - b.totalDamageDealtToChampions);
    return sorted[0].summonerName = this.player.summonerName;
  };

  isMostKills() {
    if (!this.currentParticipant) return;
    const sorted = this.data.info.participants.sort((a, b) => b.kills - a.kills);
    return sorted[0].summonerName = this.player.summonerName;
  };

  diedMoreThan10Times() {
    if (!this.currentParticipant) return;

    return this.currentParticipant.deaths >= 10;
  };

  gotMoreThan15Kills() {
    if (!this.currentParticipant) return;

    return this.currentParticipant.kills >= 15;
  };

  didMoreThan40KDamage() {
    if (!this.currentParticipant) return;

    return this.currentParticipant.totalDamageDealtToChampions >= 40000;
  };

  gotPentaKill() {
    if (!this.currentParticipant) return;
    
    return this.currentParticipant.pentaKills >= 1;
  };

  isYuumi() {
    if (!this.currentParticipant) return;
    
    return this.currentParticipant.championName === "Yuumi";
  };

  isTeemo() {
    if (!this.currentParticipant) return;
    
    return this.currentParticipant.championName === "Teemo";
  };

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

  public getCurrentParticipant(data: GameInfo) {
    this.currentParticipant = data.info.participants.filter((participant) => participant.summonerName === this.player.summonerName)[0];
  }
};