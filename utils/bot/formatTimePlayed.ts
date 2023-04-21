import { TimePlayedData } from "types/types";

export default function formatTimePlayed(data: TimePlayedData[]) {
    let fields = [];
    let firstColumn = {} as any;
    firstColumn["name"] = "Player";
    firstColumn["value"] = data.map((player) => player.summonerName).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {} as any;
  
    secondColumn["name"] = "Hours Burned";
    secondColumn["value"] = data.map((player) => player.timePlayed).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    return fields;
  }
  