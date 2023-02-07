import { PLAYER_NAMES, BOT_PREFIX } from "../constants.js";
import { lastGameCommentary } from "../utils/bot/lastGameCommentary.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import {
  isCommandUsername,
  isGreetingCommand,
  isHelpCommand,
  isImage,
  isRankSubcommand,
  isStatisticCommand,
  isChatGPT,
  isChampionCommand,
} from "../utils/parseCommands.js";
import { AiClient } from "./ai.js";
import { rankPlayersAlgo } from "../utils/rankPlayersAlgo.js";
import { EmbedBuilder } from "discord.js";
import { formatWeeklyRankingsMessage } from "../utils/bot/formatWeeklyRankingsMessage.js";
import { formatMessage } from "../utils/bot/formatMessage.js";
import { formatKillsMessage } from "../utils/bot/formatKillsMessage.js";
import { formatDamageMessage } from "../utils/bot/formatDamageMessage.js";
import { LeagueActions } from "./league.js";
import formatWinsMessage from "../utils/bot/formatWinsMessage.js";
import formatChampionData from "../utils/bot/formatChampionData.js";
import formatMultiKills from "../utils/bot/formatMultiKills.js";
import formatTimePlayed from "../utils/bot/formatTimePlayed.js";
import formatRageQuits from "../utils/bot/formatRageQuits.js";
import formatDuos from "../utils/bot/formatDuos.js";

const aiClient = new AiClient();
const league = new LeagueActions();

export class BotActions {
  constructor() {}

  parseCommands(message) {
    const command = message.content.split(BOT_PREFIX)[1].trim();
    let options = {};

    if (isImage(command)) {
      options.type = "image";
      options.prompt = aiClient.getPrompt(message.content);
      return options;
    }

    if (isChatGPT(command)) {
      options.type = "text";
      options.prompt = aiClient.getPrompt(message.content);
      return options;
    }

    if (isCommandUsername(command)) {
      options.type = "player";
      options.player = leagueUsername(command);
      return options;
    }

    if (isGreetingCommand(command)) {
      options.type = "greeting";
      return options;
    }

    if (isHelpCommand(command)) {
      options.type = "help";
      return options;
    }

    if (isChampionCommand(message.content)) {
      options.type = "player";
      options.subCommand = "champions";
      options.player = leagueUsername(command.split(" ")[0]);
      return options;
    }

    if (isRankSubcommand(message.content)) {
      options.type = "player";
      options.subCommand = "rank";
      options.player = leagueUsername(command.split(" ")[0]);
      return options;
    }

    if (isStatisticCommand(command).length > 0) {
      options.type = "statistic";
      options.subCommand = isStatisticCommand(command)[0];
      return options;
    }

    return options;
  }

  async handleGetLastMatchData(summonerName, discordUser) {
    try {
      const user = leagueUsername(summonerName);
      const matchData = await league.handleGetPlayerLastMatchData(user.puuid);
      return await lastGameCommentary(matchData, user.userName, discordUser);
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetLeagueUserData(userName, discordUser) {
    try {
      const userData = await league.handleGetPlayerUserData(userName);
      return `<@${discordUser}> is in ${userData.tier} ${
        userData.rank
      } and has ${userData.leaguePoints} LP with a ${(
        (userData.wins / (userData.wins + userData.losses)) *
        100
      ).toFixed(2)}% win rate in ${userData.wins + userData.losses} games.`;
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetLeadboardRankings() {
    const data = PLAYER_NAMES.map(async function (player) {
      try {
        const userData = await league.handleGetPlayerUserData(player.userName);
        if (userData) {
          return userData;
        }
      } catch (err) {
        throw new Error(err);
      }
    });

    const final = await Promise.all(data);
    const players = final.filter((el) => el !== undefined);
    const rankings = rankPlayersAlgo(players);

    const embed = new EmbedBuilder()
      .setColor("DARK_BLUE")
      .setTitle("League of Legends Leaderboard")
      .setDescription("Current Rankings of Discord Members")
      .addFields(formatMessage(rankings));

    return { embeds: [embed] };
  }

  async handleGetWeeklyData() {
    try {
      const data = await league.handleGetLast7DaysData();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle("League of Legends Weekly Ranks")
        .setDescription("Weekly Rankings of Discord Members")
        .addFields(formatWeeklyRankingsMessage(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetKillsData() {
    try {
      const data = await league.handleGetKillsData();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle("League of Legends Wins")
        .setDescription("Wins of Discord Members")
        .addFields(formatKillsMessage(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetAverageDamage() {
    try {
      const data = await league.handleGetAverageDamage();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle("Discord Top Damage")
        .setDescription("Damage Rankings of Discord")
        .addFields(formatDamageMessage(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleGetWinsData() {
    try {
      const data = await league.handleGetWinsData();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle("League of Legends Wins")
        .setDescription("Wins Rankings of Discord Members")
        .addFields(formatWinsMessage(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleChampionData(userName) {
    try {
      const data = await league.handleChampionData(userName);

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle(`${userName} Champion Data`)
        .setDescription("Current Record of Champions")
        .addFields(formatChampionData(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleMultiData() {
    try {
      const data = await league.handleMultiData();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle(`Top Multi-Kills`)
        .setDescription("Discord Members")
        .addFields(formatMultiKills(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleTimePlayed() {
    try {
      const data = await league.handleTimePlayed();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle(`Hours Burning`)
        .setDescription("Quemadera Full Time")
        .addFields(formatTimePlayed(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleRageQuits() {
    try {
      const data = await league.handleRageQuits();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle(`Biggest Rage Quitter NA`)
        .setDescription("Professional ALT-F4 Chart")
        .addFields(formatRageQuits(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }

  async handleDuo() {
    try {
      const data = await league.handleDuo();

      const embed = new EmbedBuilder()
        .setColor("DARK_BLUE")
        .setTitle(`Best Duos in Discord`)
        .setDescription("Games & Win % by Duo")
        .addFields(formatDuos(data));

      return { embeds: [embed] };
    } catch (err) {
      throw new Error(err);
    }
  }
}
