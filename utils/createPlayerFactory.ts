import { Player } from "../controllers/Player";
import { Player as PlayerType } from "../types/types";

export function createPlayerFactory(player: PlayerType): Player {
  return new Player({
    ...player,
    lastGame: undefined,
    currentStats: undefined,
    last10Games: [],
  });
}
