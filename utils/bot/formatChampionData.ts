import { ChampionData } from "../../types/types";

function formatWinsLosses(data: ChampionData[]) {
    return data.map((player) => {
        return `${player.games} / ${player.wins} / ${(player['win rate'] * 100).toFixed(2)}%`;
    }).join("\n")
};

function formatKDA(data: ChampionData[]) {
  return data.map((player) => {
      return `${player.kills} / ${player.deaths} / ${player.assists}`;
  }).join("\n")
};

export default function formatChampionData(data: ChampionData[]) {
  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Champion";
  firstColumn["value"] = data.map((player) => player.championName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;

  secondColumn["name"] = "KDA";
  secondColumn["value"] = formatKDA(data);
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {} as any;

  thirdColumn["name"] = "Games/Wins/Pctg";
  thirdColumn["value"] = formatWinsLosses(data);
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
}
