export const commentary = (playerPerformance, discordUser) => {
  switch (true) {
    case playerPerformance.kills > 15 &&
      playerPerformance.deaths < 5 &&
      playerPerformance.win === false: {
      return `Ñoooooooo asere <@${discordUser}> just killed ${playerPerformance.kills} people & y no pudo dal carry...q fula.`;
    }
    case playerPerformance.kills > 15 &&
      playerPerformance.deaths < 5 &&
      playerPerformance.win === win: {
      return `De pinga <@${discordUser}> just killed ${playerPerformance.kills} people & only died ${playerPerformance.deaths} times.`;
    }
    case playerPerformance.kills > 10 &&
      playerPerformance.deaths > 10 &&
      playerPerformance.win === true: {
      return `El taigel <@${discordUser}> just got ${playerPerformance.kills} but we need to work on those ${playerPerformance.deaths} deaths.`;
    }
    case playerPerformance.kills > 10 &&
      playerPerformance.deaths < 10 &&
      playerPerformance.win === false: {
      return `El <@${discordUser}> mato ${playerPerformance.kills} gente pero no pudo dar carry feels bad man`;
    }
    case playerPerformance.kills < playerPerformance.deaths &&
      playerPerformance.win === true: {
      return `Bueno a veces le dan carry a la gente como paso con <@${discordUser}>...hope nobody broke their back.`;
    }
    case playerPerformance.deaths > 8 &&
      playerPerformance.kills < 3 &&
      playerPerformance.win === true: {
      return `Papa.....I'm not even gonna say anything about <@${discordUser}>'s ${playerPerformance.deaths} deaths.`;
    }
    case playerPerformance.deaths > 8 &&
      playerPerformance.kills < 3 &&
      playerPerformance.win === false: {
      return `<@${discordUser}> yo tu le doy un ALT-F4 al juego por hoy because it's not your day TBH...`;
    }
    case playerPerformance.deaths > 10 && playerPerformance.kills < 1: {
      return `<@${discordUser}> yo tu le doy un uninstall a league y me pongo a jugar Club Penguin or something like that...`;
    }
  }
};
