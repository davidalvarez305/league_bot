import { WeeklyData } from "types/types";

export const formatWeeklyRankingsMessage = (rankings: WeeklyData[]) => {
  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Rankings";
  firstColumn["value"] = rankings.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "Wins";
  secondColumn["value"] = rankings.map((player) => player.wins).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "Games";
  thirdColumn["value"] = rankings.map((player) => player.games).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
};
