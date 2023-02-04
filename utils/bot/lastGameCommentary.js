import {
  isTopDamage,
  isTopPlayer,
  isTopKills,
  isLeastDamage,
  isWorstPlayer,
  isDuo,
} from "../gameAnalysis.js";
import { rankPlayersInMatch } from "../rankPlayersInMatch.js";
import { duoMessagesLoss, duoMessagesWin } from "./duoMessages.js";

export const lastGameCommentary = (matchData, userName, discordUser) => {
  const performance = matchData.info.participants.filter(
    (p) => p.summonerName === userName
  )[0];

  const topPlayer = isTopPlayer(matchData, userName);
  const topDamage = isTopDamage(matchData, userName);
  const topKills = isTopKills(matchData, userName);
  const leastDamage = isLeastDamage(matchData, userName);
  const worstPlayer = isWorstPlayer(matchData, userName);
  const duo = isDuo(matchData);

  if (duo.length > 1) {
    const { lobbyRankings } = rankPlayersInMatch(duo);
    switch (true) {
      case duo[0].win: {
        return duoMessagesWin(lobbyRankings[0].player, lobbyRankings[1].player);
      }
      case !duo[0].win: {
        return duoMessagesLoss(
          lobbyRankings[0].player,
          lobbyRankings[1].player
        );
      }
    }
  }

  switch (true) {
    case topPlayer && performance.win: {
      return `$asere text <@${discordUser}> hard carried last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths. What can you say about that?`;
    }
    case topPlayer && !performance.win: {
      return `$asere text <@${discordUser}> was the best player in the last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths but couldn't bring the dub home. What can you say about that?`;
    }
    case topDamage && performance.win: {
      return `$asere text <@${discordUser}> bajo tremendo foco last game with ${performance.kills} kills, ${performance.assists} assists, ${performance.deaths} deaths and got the free dub by doing the most damage. What can you say about that?`;
    }
    case topDamage && !performance.win: {
      return `$asere text <@${discordUser}> did the most damage last game but couldn't win. Sad days bruv. Man got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths What can you say about that?`;
    }
    case topKills && performance.win: {
      return `$asere text <@${discordUser}> just got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. El tipo le dio caña a to el mundo & got the DUB. What can you say about that?`;
    }
    case topKills && !performance.win: {
      return `$asere text <@${discordUser}> just got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. Killed a lot of people but didn't win. What can you say about that?`;
    }
    case leastDamage && performance.win: {
      return `$asere text <@${discordUser}> did the least damage in the game but somehow got carried and won. XD. Man had ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. What can you say about that?`;
    }
    case leastDamage && !performance.win: {
      return `$asere text <@${discordUser}> did the least damage and caused his team the game. ALT-F4 is the name of the game for you. LOL. He got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. What can you say about that?`;
    }
    case worstPlayer && performance.win: {
      return `$asere text <@${discordUser}> IDK how you managed to be that bad and still win. Man was the worst player in the lobby and got the dub by getting carried. He got ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. What can you say about that?`;
    }
    case worstPlayer && !performance.win: {
      return `$asere text <@${discordUser}> not only didn't you not win, but you were also the worst player in the lobby with ${performance.kills} kills, ${performance.assists} assists, and ${performance.deaths} deaths. What can you say about that?`;
    }
    default: {
      return `$asere text <@${discordUser}> just got ${performance.kills} kills, ${
        performance.assists
      } assists, and ${
        performance.deaths
      } deaths. Nothing special, average player.${
        performance.win ? ` Got carried.` : ` Lost because he sucks.`
      } What can you say about that?`;
    }
  }
};
