import { WinData } from "types/types";

function formatWinsLosses(data: WinData[]) {
    return data.map((player) => {
        return `${player.wins} / ${(player['win rate'] * 100).toFixed(2)}%`;
    }).join("\n")
};

export default function formatWinsMessage(data: WinData[]) {
  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Player";
  firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "Games";
  secondColumn["value"] = data.map((player) => player.games).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "W/L";
  thirdColumn["value"] = formatWinsLosses(data);
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
}
