import {
  greetingsCommands,
  GREETINGS,
  WRONG_COMMAND,
} from "../utils/bot/responses.js";
import { getRandomIndex } from "../utils/getRandomIndex.js";
export const Bot = (message) => {
  switch (message) {
    case greetingsCommands(message): {
      return GREETINGS[getRandomIndex(GREETINGS.length)];
    }
    default:
      return WRONG_COMMAND[getRandomIndex(WRONG_COMMAND.length)];
  }
};