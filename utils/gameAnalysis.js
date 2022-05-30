import { rankPlayersInMatch } from "./rankPlayersInMatch.js";
import { PLAYER_NAMES } from "../constants.js";

export const isTopDamage = (matchData, userName) => {
  const { topDamage } = rankPlayersInMatch(matchData.info.participants);
  return topDamage.player === userName;
};

export const isLeastDamage = (matchData, userName) => {
  const { bottomDamage } = rankPlayersInMatch(matchData.info.participants);
  return bottomDamage.player === userName;
};

export const isTopKills = (matchData, userName) => {
  const { topKills } = rankPlayersInMatch(matchData.info.participants);
  return topKills.player === userName;
};

export const isTopPlayer = (matchData, userName) => {
  const { topPlayer } = rankPlayersInMatch(matchData.info.participants);
  return topPlayer.player === userName;
};

export const isWorstPlayer = (matchData, userName) => {
  const { bottomPlayer } = rankPlayersInMatch(matchData.info.participants);
  return bottomPlayer.player === userName;
};

export const isDuo = (matchData) => {
  let duoPartners = [];
  matchData.info.participants.map((participant) => {
    const player = PLAYER_NAMES.filter(
      (p) => p.userName === participant.summonerName
    )[0];
    if (player) {
      duoPartners.push(participant);
    }
  });
  return duoPartners;
};
