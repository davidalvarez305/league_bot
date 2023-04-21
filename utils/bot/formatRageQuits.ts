import { RageQuitsData } from "../../types/types";

export default function formatRageQuits(data: RageQuitsData[]) {
    let fields = [];
    let firstColumn = {} as any;
    firstColumn["name"] = "Player";
    firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {} as any;
  
    secondColumn["name"] = "Rage Quits";
    secondColumn["value"] = data.map((player) => player.rageQuits).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  }
  