export default function formatTimePlayed(data) {
    let fields = [];
    let firstColumn = {};
    firstColumn["name"] = "Player";
    firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {};
  
    secondColumn["name"] = "Hours Burned";
    secondColumn["value"] = data.map((player) => player.timePlayed).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  }
  