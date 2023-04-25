import { LEAGUE_RANKS } from "../constants";
import { GameInfo, Participant } from "../types/game";
import { Player } from "./Player";

export class GameAnalysis {
  data: GameInfo;
  player: Player;
  currentParticipant: Participant;

  constructor(data: GameInfo, player: Player) {
    this.data = data;
    this.player = player;
    this.currentParticipant = this.data.info.participants.filter((participant) => participant.summonerName === this.player.summonerName)[0];
  };

  public isTopDamage() {
    const sorted = this.data.info.participants.sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions);
    return sorted[0].summonerName === this.player.summonerName;
  };

  public isLastDamage() {
    const sorted = this.data.info.participants.sort((a, b) => a.totalDamageDealtToChampions - b.totalDamageDealtToChampions);
    return sorted[0].summonerName === this.player.summonerName;
  };

  public isMostKills() {
    const sorted = this.data.info.participants.sort((a, b) => b.kills - a.kills);
    return sorted[0].summonerName === this.player.summonerName;
  };

  public diedMoreThan10Times() {
    return this.currentParticipant.deaths >= 10;
  };

  public gotMoreThan15Kills() {
    return this.currentParticipant.kills >= 15;
  };

  public didMoreThan40KDamage() {
    return this.currentParticipant.totalDamageDealtToChampions >= 40000;
  };

  public gotPentaKill() {
    return this.currentParticipant.pentaKills >= 1;
  };

  public isYuumi() {
    return this.currentParticipant.championName === "Yuumi";
  };

  public isTeemo() {
    return this.currentParticipant.championName === "Teemo";
  };

  public async isDeranked() {
    if (!this.currentParticipant.win) {
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

  public isOnLosingStreak() {
    return this.player.player.last10Games.filter(game => game).length >= 6;
  };
};