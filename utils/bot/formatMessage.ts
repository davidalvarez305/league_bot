import { LeaderboardPlayer } from "../../types/types";

export const formatMessage = (rankings: LeaderboardPlayer[]) => {

  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Rankings";
  firstColumn["value"] = rankings.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "Rank";
  secondColumn["value"] = rankings.map((player) => {
    return `${player.tier} ${player.rank}`
  }).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "LP";
  thirdColumn["value"] = rankings.map((player) => player.leaguePoints).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
};