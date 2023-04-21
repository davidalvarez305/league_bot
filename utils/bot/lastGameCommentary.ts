import { handleRequestText } from "actions/ai";
import { GameInfo } from "types/game";

export const lastGameCommentary = async (matchData: GameInfo, userName: string, discordUser: string) => {
  const performance = matchData.info.participants.filter(
    (p) => p.summonerName === userName
  )[0];

  const DAMAGE_DEALT = performance['totalDamageDealtToChampions'];
  const PLAYER_KILLS = performance['kills'];
  const PLAYER_DEATHS = performance['deaths'];
  const PLAYER_ASSISTS = performance['assists'];
  const GAME_WON = performance['win'] ? "won" : "lost";
  const CHAMPION_PLAYED = performance['championName'];
  const LANE_PLAYED = performance['lane'];

  let gameMessage = `${userName} dealt ${DAMAGE_DEALT} damage. Had ${PLAYER_KILLS} kills, ${PLAYER_ASSISTS} assists, and ${PLAYER_DEATHS} deaths while playing as ${CHAMPION_PLAYED} in the ${LANE_PLAYED}. The game was ${GAME_WON}. What can you say about that?`
  
  
  try {
    const resp = await handleRequestText(gameMessage);
    return `<@${discordUser}>: ${resp}` 
  } catch (err) {
    throw new Error(err as any);
  }
};
