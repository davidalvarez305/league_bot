import { Greetings } from "../actions/bot.js";

export const Bot = (message) => {
  switch (message) {
    case "que bola": {
      return Greetings();
    }
    default:
      return "la tuya por si acaso"
  }
};
