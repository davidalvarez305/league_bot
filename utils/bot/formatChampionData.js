function formatWinsLosses(data) {
    return data.map((player) => {
        return `${player.wins} / ${(player['win rate'] * 100).toFixed(2)}%`;
    }).join("\n")
};

export default function formatChampionData(data) {
  let fields = [];
  let firstColumn = {};
  firstColumn["name"] = "Champion";
  firstColumn["value"] = data.map((player) => player.championName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {};

  secondColumn["name"] = "Games";
  secondColumn["value"] = data.map((player) => player.games).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {};

  thirdColumn["name"] = "Wins/Win Rate";
  thirdColumn["value"] = formatWinsLosses(data);
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
}
