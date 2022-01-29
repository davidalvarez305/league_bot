import { getRandomIndex } from "../utils/getRandomIndex.js";
import { GREETINGS } from "../utils/bot/greetings.js";
import { GUAPERIA } from "../utils/bot/guaperia.js";
import { GetPlayerMatchHistory } from "../controllers/league.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import { ASERE } from "../utils/bot/asere.js";
import { INSULTS } from "../utils/bot/insults.js";
import Discord from "discord.js";

export const Greetings = () => {
  return GREETINGS[getRandomIndex(GREETINGS.length)];
};

export const Guaperia = () => {
  return GUAPERIA[getRandomIndex(GUAPERIA.length)];
};

export const getLastMatchData = async (command, discordUser) => {
  const user = leagueUsername(command);
  const matchData = await GetPlayerMatchHistory(user.puuid, user.userName);

  return `${ASERE[getRandomIndex(ASERE.length)]} <@${discordUser}> ${
    INSULTS[getRandomIndex(INSULTS.length)]
  }. Estaba jugando ${matchData.championName} ${
    matchData.teamPosition
  } y lo mataron ${matchData.deaths} veces.`
};
