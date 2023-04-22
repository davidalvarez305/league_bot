import { GameInfo } from "../types/game";
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
}
