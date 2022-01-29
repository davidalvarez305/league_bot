import { Greetings, Guaperia } from "../actions/bot.js";
import { greetingsComands } from "../utils/bot/greetingsCommands.js";

export const Bot = (message) => {
  switch (message) {
    case greetingsComands(message): {
      return Greetings();
    }
    default:
      return Guaperia();
  }
};
