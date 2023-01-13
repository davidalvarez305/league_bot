export const rankPlayersInMatch = (allPlayersData) => {
  const lobbyRankings = allPlayersData.map((player) => {
    let obj = {};

    let totalRankingScore = 0;

    totalRankingScore += (player.kills * 500);
    totalRankingScore += (player.assists * 250);
    totalRankingScore += (player.totalDamageDealtToChampions / 20);
    totalRankingScore += (player.totalTimeCCDealt * 2.5);
    totalRankingScore -= (player.deaths * 500);

    obj["player"] = player.summonerName;
    obj["champion"] = player.championName;
    obj["score"] = totalRankingScore;
    obj["kills"] = player.kills;
    obj["deaths"] = player.deaths;
    obj["assists"] = player.assists;
    obj["damage"] = player.totalDamageDealtToChampions;
    obj["win"] = player.win;

    return obj;
  });

  const topDamage = lobbyRankings.sort((a, b) => b.damage - a.damage)[0];
  const bottomDamage = lobbyRankings.sort((a, b) => a.damage - b.damage)[0];
  const topKills = lobbyRankings.sort((a, b) => b.kills - a.kills)[0];
  const topPlayer = lobbyRankings.sort((a, b) => b.score - a.score)[0];
  const bottomPlayer = lobbyRankings.sort((a, b) => a.score - b.score)[0];

  return {
    lobbyRankings,
    topDamage,
    bottomDamage,
    topKills,
    topPlayer,
    bottomPlayer
  };
};
