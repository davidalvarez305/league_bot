export default function formatDuos(data) {
    let fields = [];
    let firstColumn = {};
    firstColumn["name"] = "Players";
    firstColumn["value"] = data.map((player) => player.players).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {};
  
    secondColumn["name"] = "Games";
    secondColumn["value"] = data.map((player) => player.games).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    let thirdColumn = {};
  
    thirdColumn["name"] = "Win %";
    thirdColumn["value"] = data.map((player) => player['wr']).join("\n");
    thirdColumn["inline"] = true;
  
    fields.push(thirdColumn);
  
    return fields;
  }
  