export const rankPlayersAlgo = (data) => {
  const attributes = data.map((player) => {
    let object = {};
    let totalRanking = 0;
    const { tier, rank, leaguePoints } = player;
    totalRanking += leaguePoints;
    switch (tier) {
      case "IRON": {
        totalRanking += 1000;
        break;
      }
      case "BRONZE": {
        totalRanking += 2000;
        break;
      }
      case "SILVER": {
        totalRanking += 3000;
        break;
      }
      case "GOLD": {
        totalRanking += 4000;
        break;
      }
      case "PLATINUM": {
        totalRanking += 5000;
        break;
      }
      case "DIAMOND": {
        totalRanking += 6000;
        break;
      }
      case "GRANDMASTER": {
        totalRanking += 7000;
        break;
      }
      case "CHALLENGER": {
        totalRanking += 8000;
        break;
      }
      default:
        totalRanking += 0;
        break;
    }
    switch (true) {
      case rank === "I": {
        totalRanking += 400;
        break;
      }
      case rank === "II": {
        totalRanking += 300;
        break;
      }
      case rank === "III": {
        totalRanking += 200;
        break;
      }
      case rank === "IV": {
        totalRanking += 100;
        break;
      }
    }
    object['summonerName'] = player.summonerName;
    object['points'] = totalRanking;
    object['tier'] = tier;
    object['rank'] = rank;
    object['leaguePoints'] = leaguePoints;
    object['wins'] = player.wins;
    object['losses'] = player.losses;
    return object;
  }).sort((a, b) => b.points - a.points);
  return attributes;
};
