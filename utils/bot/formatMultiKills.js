export default function formatMultiKills(data) {
  let fields = [];
  let firstColumn = {};
  firstColumn["name"] = "Player";
  firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {};

  secondColumn["name"] = "Multi Kills";
  firstColumn["value"] = data.map((player) => player.multiKills).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {};

  thirdColumn["name"] = "Pentas";
  firstColumn["value"] = data.map((player) => player.pentaKills).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

  return fields;
}
