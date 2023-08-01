import { LEAGUE_RANKS, LEAGUE_TIERS } from "../constants";
import { GameInfo, Participant } from "../types/game";
import { Player } from "./Player";

export class GameAnalysis {
  data: GameInfo;
  player: Player;
  currentParticipant: Participant;

  constructor(data: GameInfo, player: Player) {
    this.data = data;
    this.player = player;
    this.currentParticipant = this.data.info.participants.filter((participant) => participant.summonerName === this.player.player.userName)[0];
  };

  public isTopDamage() {
    const sorted = this.data.info.participants.sort((a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions);
    return sorted[0].summonerName === this.player.player.userName;
  };

  public isLastDamage() {
    const sorted = this.data.info.participants.sort((a, b) => a.totalDamageDealtToChampions - b.totalDamageDealtToChampions);
    return sorted[0].summonerName === this.player.player.userName;
  };

  public isMostKills() {
    const sorted = this.data.info.participants.sort((a, b) => b.kills - a.kills);
    return sorted[0].summonerName === this.player.player.userName;
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

        if (!updatedStats) {
          throw new Error('Unable to complete action for this player since they have not played.');
        }

        if (!this.player.player.currentStats) this.player.player.currentStats = updatedStats;

        let previousPoints = LEAGUE_RANKS[this.player.player.currentStats.rank] + LEAGUE_TIERS[this.player.player.currentStats.tier];
        let currentPoints = LEAGUE_RANKS[updatedStats.rank] + LEAGUE_TIERS[updatedStats.tier];

        // If they have less points than before, it means that the player has deranked
        const answer = previousPoints < currentPoints;
        
        this.player.player.currentStats = updatedStats;
      return answer;
      } catch (err) {
        throw new Error(err as any);
      }
    }
    return false;
  };

  public isOnLosingStreak() {
    return this.player.player.last10Games.filter(game => !game).length >= 6;
  };
};