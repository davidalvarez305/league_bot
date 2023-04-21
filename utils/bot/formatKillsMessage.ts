import { KillsData } from "../../types/types";

export const formatKillsMessage = (rankings: KillsData[]) => {
  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Rankings";
  firstColumn["value"] = rankings
    .map((player) => player.summonerName)
    .join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "Kills";
  secondColumn["value"] = rankings.map((player) => player.kills).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "Deaths";
  thirdColumn["value"] = rankings.map((player) => player.deaths).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
};
