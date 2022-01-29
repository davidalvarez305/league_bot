import { getRandomIndex } from "../utils/getRandomIndex.js";
import { GREETINGS } from "../utils/bot/greetings.js";
import { GUAPERIA } from "../utils/bot/guaperia.js";
import { GetPlayerLastMatchData } from "../controllers/league.js";
import { leagueUsername } from "../utils/bot/leagueUsername.js";
import { ASERE } from "../utils/bot/asere.js";
import { INSULTS } from "../utils/bot/insults.js";

export const Greetings = () => {
  return GREETINGS[getRandomIndex(GREETINGS.length)];
};

export const Guaperia = () => {
  return GUAPERIA[getRandomIndex(GUAPERIA.length)];
};

export const getLastMatchData = async (command, discordUser) => {
  const user = leagueUsername(command);
  const matchData = await GetPlayerLastMatchData(user.puuid, user.userName);

  switch (true) {
    case matchData.deaths > 10: {
      return `${ASERE[getRandomIndex(ASERE.length)]} <@${discordUser}> ${
        INSULTS[getRandomIndex(INSULTS.length)]
      }. Estaba jugando ${matchData.championName} ${
        matchData.teamPosition
      } y lo mataron ${matchData.deaths} veces.`;
    }
    case matchData.deaths > matchData.kills: {
      return `${
        ASERE[getRandomIndex(ASERE.length)]
      } <@${discordUser}> lo mataron ${matchData.deaths} and he only got ${
        matchData.kills
      } que pena brother.`;
    }
    case matchData.kills > matchData.deaths: {
      return `<@${discordUser}> es tremendo taigel. Mato ${matchData.kills} noobs y lo mataron ${matchData.deaths} veces.`;
    }
  }
};
