import { handleBotResponse, parseCommands } from "../actions/bot.js";

export class BotController {
  constructor(discordClient) {
    this.discordClient = discordClient;
  }

  async handleMessage(msg) {
    const args = parseCommands(msg);

    try {
      const message = await handleBotResponse(args, this.discordClient);
      if (message) {
        return msg.reply(message);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
