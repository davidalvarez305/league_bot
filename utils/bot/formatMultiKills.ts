import { MultiData } from "../../types/types";

export default function formatMultiKills(data: MultiData[]) {
  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Player";
  firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "Multi";
  secondColumn["value"] = data.map((player) => player.multiKills).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "Pentas";
  thirdColumn["value"] = data.map((player) => player.pentaKills).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
}
