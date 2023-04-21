import { AverageGameData } from "types/types";

export const formatDamageMessage = (rankings: AverageGameData[]) => {
    let fields = [];
    let firstColumn = {} as any;
    firstColumn["name"] = "Rankings";
    firstColumn["value"] = rankings
      .map((player) => player.summonerName)
      .join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {} as any;
  
    secondColumn["name"] = "Damage";
    secondColumn["value"] = rankings.map((player) => player.totalDamageDealtToChampions).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  };
  