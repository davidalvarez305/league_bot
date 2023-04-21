import { RANK_COMMAND, CHAMPION_COMMAND } from "../constants.js";
import { leagueUsername } from "./bot/leagueUsername.js";
import { GREETING_COMMANDS } from "./bot/responses.js";

export const isRankSubcommand = (command: string) => {
  return command.match(RANK_COMMAND) !== null;
};

export const isChampionCommand = (command: string) => {
  return command.match(CHAMPION_COMMAND) !== null;
}

export const isCommandUsername = (command: string) => {
  return leagueUsername(command).name.length > 0;
};

export const isGreetingCommand = (command: string) => {
  return GREETING_COMMANDS.filter((g) => g === command).length > 0;
};

export const isStatisticCommand = (command: string) => {
  let statCommands = ["kills", "weekly", "leaderboard", "damage", "wins", "multi", "time", "surrender", "duo"];
  return statCommands.filter((c) => c === command);
};

export const isHelpCommand = (command: string) => {
  return command === "help";
};

export function isImage(command: string) {
  return command.includes("image ");
}

export function isChatGPT(command: string) {
  return command.includes("text ");
}