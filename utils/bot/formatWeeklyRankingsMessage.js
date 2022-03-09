export const formatWeeklyRankingsMessage = (rankings) => {
  let fields = [];
  let firstColumn = {};
  firstColumn["name"] = "Rankings";
  firstColumn["value"] = rankings.map((player) => player.summonerName).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {};

  secondColumn["name"] = "Wins";
  secondColumn["value"] = rankings.map((player) => player.wins).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);

  let thirdColumn = {};

  thirdColumn["name"] = "Games";
  thirdColumn["value"] = rankings.map((player) => player.games).join("\n");
  thirdColumn["inline"] = true;

  fields.push(thirdColumn);

/*   let fourthColumn = {};

  fourthColumn["name"] = "Games";
  fourthColumn["value"] = rankings.map((player) => player.games).join("\n");
  fourthColumn["inline"] = true;

  fields.push(fourthColumn); */

  return fields;
};
