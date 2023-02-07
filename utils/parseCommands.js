import { RANK_COMMAND, CHAMPION_COMMAND } from "../constants.js";
import { leagueUsername } from "./bot/leagueUsername.js";
import { GREETING_COMMANDS } from "./bot/responses.js";

export const isRankSubcommand = (command) => {
  return command.match(RANK_COMMAND) !== null;
};

export const isChampionCommand = (command) => {
  return command.match(CHAMPION_COMMAND) !== null;
}

export const isCommandUsername = (command) => {
  return leagueUsername(command).name.length > 0;
};

export const isGreetingCommand = (command) => {
  return GREETING_COMMANDS.filter((g) => g === command).length > 0;
};

export const isStatisticCommand = (command) => {
  let statCommands = ["kills", "weekly", "leaderboard", "damage", "wins", "multi", "time", "surrender", "duo"];
  return statCommands.filter((c) => c === command);
};

export const isHelpCommand = (command) => {
  return command === "help";
};

export function isImage(command) {
  return command.includes("image ");
}

export function isChatGPT(command) {
  return command.includes("text ");
}