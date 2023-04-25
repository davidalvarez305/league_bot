import { GameAnalysis } from "./GameAnalysis";
import { Player } from "./Player";

export class Commentary {
  game: GameAnalysis;
  player: Player;
  discordUser: string;

  constructor(game: GameAnalysis, player: Player, discordUser: string) {
    this.game = game;
    this.player = player;
    this.discordUser = discordUser;
  }

  public async gameCommentary(): Promise<string | undefined> {
    try {
      switch (true) {
        case await this.game.isDeranked():
          return `<@${this.discordUser}> just deranked LMFAO. Man is back to ${this.player.player.currentStats.rank} ${this.player.player.currentStats.tier} now.`;
        case this.game.isOnLosingStreak():
          return `<@${this.discordUser}> is in a bad losing streak XDDDDDDDDDDDDDDDDDDDDDDDD.`;
        case this.game.isTeemo():
          return `<@${this.discordUser}> just played Teemo. Que clase de llegua.`;
        case this.game.isYuumi():
          return `<@${this.discordUser}> was AFK last game playing Yuumi.`;
        case this.game.gotPentaKill():
          return `<@${this.discordUser}> just got a PENTA KILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL`;
        case this.game.didMoreThan40KDamage():
          return `<@${this.discordUser}> just did ${this.game.currentParticipant?.totalDamageDealtToChampions} damage with ${this.game.currentParticipant?.kills} kills, que fula se puso mio.`;
        case this.game.isTopDamage():
          return `<@${this.discordUser}> was top damooooooooooooooge.`;
        case this.game.isLastDamage():
          return `<@${this.discordUser}> was worst damage. Tremendo punto.`;
        case this.game.gotMoreThan15Kills():
          return `<@${this.discordUser}> was dio tremenda caña with ${this.game.currentParticipant?.kills} kills. And he died ${this.game.currentParticipant?.deaths} times.`;
        case this.game.isMostKills():
          return `<@${this.discordUser}> bajo tremendo foco con ${this.game.currentParticipant?.kills} kills.`;
        case this.game.diedMoreThan10Times():
          return `<@${this.discordUser}> has been reported for intentionally feeding after dying ${this.game.currentParticipant?.deaths} times.`;
        default:
          return undefined;
      }
    } catch (err) {
      throw new Error(err as any);
    }
  }
}
