import { DuoData } from "types/types";

export default function formatDuos(data: DuoData[]) {
    let fields = [];
    let firstColumn = {} as any;
    firstColumn["name"] = "Players";
    firstColumn["value"] = data.map((player) => player.players).join("\n");
    firstColumn["inline"] = true;
  
    fields.push(firstColumn);
  
    let secondColumn = {} as any;
  
    secondColumn["name"] = "Games";
    secondColumn["value"] = data.map((player) => player.games).join("\n");
    secondColumn["inline"] = true;
  
    fields.push(secondColumn);
  
    let thirdColumn = {} as any;
  
    thirdColumn["name"] = "Win %";
    thirdColumn["value"] = data.map((player) => player['wr']).join("\n");
    thirdColumn["inline"] = true;
  
    fields.push(thirdColumn);
  
    return fields;
  }
  