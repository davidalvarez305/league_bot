import { AiClient } from "../../actions/ai.js";

export const lastGameCommentary = async (matchData, userName, discordUser) => {
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
  
  const ai = new AiClient();
  
  try {
    const resp = await ai.handleRequestText(gameMessage);
    return `<@${discordUser}>: ${resp}` 
  } catch (err) {
    throw new Error(err);
  }
};
