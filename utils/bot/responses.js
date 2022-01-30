export const GREETINGS = [
  "que bola",
  "q welta",
  "hablate tankeeeeeeee",
  "q bolon",
  "q welta lokol",
  "q bola chamacón",
  "q welta el mio",
  "hablate chamaco de escuela",
  "un saludos pa la gente de hialeah",
  "q welta los mio",
  "hablate pikete",
  "reportate el mio",
  "te descargo un monton y tu sabe q si",
  "asere te descargo y no te lo mando a decir con andie",
  "q welta chamaco buenoooo",
  "diaz canel singao, ando cerrao",
  "hablateeeeeeeeeeeeeeeeeeee",
  "q welta taigel",
  "hablate tankemiooooooooooooooooooooooooooooooooo",
  "q pinga eh tu sabe q yo me reporto solo",
  "igba igba yentono maferefun orula asere ashe pa ti padrino",
  "hablate matatannnnnnnnnnnnnnnnnnnnnnnn",
];

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

export const greetingsCommands = (message) => {
  return GREETING_COMMANDS.filter((g) => g === message)[0];
};

export const WRONG_COMMAND = [
    "that's not even a command my guy",
    "wut",
    "wat",
    "check your spelling bruv",
    "idk what you're saying",
    "wut u sayin m8"
]