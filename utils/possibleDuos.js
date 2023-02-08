import { PLAYER_NAMES } from "../constants.js";

export default function possibleDuos() {
  return PLAYER_NAMES.flatMap((v, i) =>
    PLAYER_NAMES.slice(i + 1).map((w) => v.userName + "/" + w.userName)
  );
}
