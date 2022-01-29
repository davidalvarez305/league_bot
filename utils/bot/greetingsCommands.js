const GREETING_COMMANDS = [
  "que bola",
  "que welta",
  "que vuelta",
  "que bolon",
  "que bolero",
  "que bolin",
  "q bola",
  "q welta",
  "q vuelta",
  "q bolon",
  "q bolero",
  "q bolin",
  "hablate",
  "k lo k",
  "que lo que",
  "que es la que hay",
  "q es la que hay",
  "k es la q hay",
  "k es la k hay",
  "klk",
];

export const greetingsComands = (message) => {
  return GREETING_COMMANDS.filter((g) => g === message)[0];
};
