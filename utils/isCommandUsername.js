import { leagueUsername } from "./bot/leagueUsername.js"

export const isCommandUsername = (command) => {
    return leagueUsername(command).name.length > 0;
}