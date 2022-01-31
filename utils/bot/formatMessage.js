export const formatMessage = (rankings) => {

/* for (let i = 0; i < 3) {

} */

  let fields = [];
  let obj = {};
  obj["name"] = "Rankings";
  obj["value"] = rankings.map((player) => player.summonerName).join("\n");
  obj["inline"] = true;

  fields.push(obj);

  let secondRow = {};

  secondRow["name"] = "Rank";
  secondRow["value"] = rankings.map((player) => player.tier).join("\n");
  secondRow["inline"] = true;

  fields.push(secondRow);

  let thirdRow = {};

  thirdRow["name"] = "DIV";
  thirdRow["value"] = rankings.map((player) => player.rank).join("\n");
  thirdRow["inline"] = true;

  fields.push(thirdRow);

  /* let fourthRow = {};

  fourthRow["name"] = "LP";
  fourthRow["value"] = rankings.map((player) => player.leaguePoints).join("\n");
  fourthRow["inline"] = true;

  fields.push(fourthRow); */

  return fields;
};
