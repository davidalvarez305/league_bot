export const formatHelpMessage = () => {
  const commandExamples = [
    "que bola",
    "weekly",
    "kills",
    "damage",
    "leaderboard",
    "david",
    "david rank",
  ];

  const exampleResponses = [
    "The bot greets you.",
    "Weekly wins and losses per player.",
    "Get the average damage per game.",
    "KDA chart of players.",
    "Current Rank + LP of all players.",
    "Last game result of a player.",
    "The rank & LP of a player.",
  ];

  let fields = [];
  let firstColumn = {} as any;
  firstColumn["name"] = "Example";
  firstColumn["value"] = commandExamples.map((c) => c).join("\n");
  firstColumn["inline"] = true;

  fields.push(firstColumn);

  let secondColumn = {} as any;
  secondColumn["name"] = "Output";
  secondColumn["value"] = exampleResponses.map((c) => c).join("\n");
  secondColumn["inline"] = true;

  fields.push(secondColumn);
  return fields;
};
