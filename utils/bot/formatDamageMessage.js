export const formatDamageMessage = (rankings) => {
    let fields = [];
    let firstColumn = {};
    firstColumn["name"] = "Rankings";
    firstColumn["value"] = rankings
      .map((player) => player.summonerName)
      .join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {};
  
    secondColumn["name"] = "Damage";
    secondColumn["value"] = rankings.map((player) => player.totalDamageDealtToChampions).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  };
  