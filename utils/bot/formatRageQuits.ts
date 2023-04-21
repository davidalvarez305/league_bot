export default function formatRageQuits(data) {
    let fields = [];
    let firstColumn = {};
    firstColumn["name"] = "Player";
    firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {};
  
    secondColumn["name"] = "Rage Quits";
    secondColumn["value"] = data.map((player) => player.rageQuits).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  }
  