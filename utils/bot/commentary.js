export const commentary = (playerPerformance, discordUser) => {
  switch (true) {
    case playerPerformance.kills > (playerPerformance.deaths * 5) &&
    playerPerformance.win === true: {
    return `Ñoooooooo asere <@${discordUser}> dio tremendo fucking carry con ${playerPerformance.kills} kills & ${playerPerformance.deaths} deaths.`;
  }
    case playerPerformance.kills > (playerPerformance.deaths * 5) &&
      playerPerformance.win === false: {
      return `Ñoooooooo <@${discordUser}> just killed ${playerPerformance.kills} people & y no pudo dal carry...q fula.`;
    }
    case playerPerformance.kills > (playerPerformance.deaths * 3) &&
      playerPerformance.win === true: {
      return `De pinga <@${discordUser}> just killed ${playerPerformance.kills} people & only died ${playerPerformance.deaths} times. Q carry.`;
    }
    case playerPerformance.deaths > (playerPerformance.kills * 3) &&
      playerPerformance.win === false: {
      return `<@${discordUser}> yo tu le doy un ALT-F4 al juego por hoy because it's not your day TBH...man died ${playerPerformance.deaths} times & got ${playerPerformance.kills} kills XD`;
    }
    case playerPerformance.deaths > (playerPerformance.kills * 3) &&
      playerPerformance.win === true: {
      return `A <@${discordUser}> le acaban dar tremendo carry, el tipo died ${playerPerformance.deaths} times and somehow he won...`;
    }
    case playerPerformance.deaths > (playerPerformance.kills * 5) &&
    playerPerformance.win === false: {
      return `<@${discordUser}> yo tu le doy un uninstall a league y me pongo a jugar Club Penguin or something like that...`;
    }
    case playerPerformance.deaths > (playerPerformance.kills * 5) &&
    playerPerformance.win === true: {
      return `LMAOOO <@${discordUser}> tell me how you won that game XD with ${playerPerformance.deaths} deaths & ${playerPerformance.kills} kills...`;
    }
    default:
      return `<@${discordUser}> just played and he got ${playerPerformance.kills} kills & ${playerPerformance.deaths} deaths. The game was ${playerPerformance.win ? `a W` : `a fat L`}.`;
  }
};
