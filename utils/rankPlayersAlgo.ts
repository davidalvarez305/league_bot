import { LeaderboardPlayer, PlayerStats } from "types/types";

export const rankPlayersAlgo = (data: PlayerStats[]) => {
  let players = [];

  for (let i = 0; i < data.length; i++) {
    const player = data[i];

    if (!player) break;

    let object: LeaderboardPlayer = {
      summonerName: "",
      points: 0,
      tier: "",
      rank: "",
      leaguePoints: 0,
      wins: 0,
      losses: 0,
    };
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
    object["summonerName"] = player.summonerName;
    object["points"] = totalRanking;
    object["tier"] = tier;
    object["rank"] = rank;
    object["leaguePoints"] = leaguePoints;
    object["wins"] = player.wins;
    object["losses"] = player.losses;

    players.push(object);
  }

  players.sort((a, b) => b.points - a.points);
  return players;
};
