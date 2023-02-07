export default function formatDuos(data) {
    let fields = [];
    let firstColumn = {};
    firstColumn["name"] = "Player";
    firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {};
  
    secondColumn["name"] = "Wins";
    secondColumn["value"] = data.map((player) => player.wins).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    let thirdColumn = {};
  
    thirdColumn["name"] = "Win %";
    thirdColumn["value"] = data.map((player) => player['win rate']).join("\n");
    thirdColumn["inline"] = true;
  
    fields.push(thirdColumn);
  
    return fields;
  }
  