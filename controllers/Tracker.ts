import { CronJob } from "cron";
import { Player } from "./Player";
import { __prod__ } from "../constants";
import { Client } from "discord.js";

export class Tracker {
  players: Player[];
  discordClient: Client<boolean>;

  constructor(players: Player[], discordClient: Client<boolean>) {
    this.players = players;
    this.discordClient = discordClient;
  }

  public async startLoop() {
    const cronJob = new CronJob("*/100 * * * * *", async () => {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        await player.GetLastMatchData(this.discordClient);
      }
    });

    // Only run this code while in production
    console.log("ENVIRONMENT: ", __prod__);
    if(__prod__) cronJob.start();
  }
}
