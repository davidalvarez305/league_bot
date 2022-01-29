import { Greetings } from "../../actions/bot.js";
import { getRandomIndex } from "../getRandomIndex.js";

const DISCORD_MEMBERS = [
  "xDAVIDx",
  "decimo",
  "Inserted",
  "Gauteke",
  "Sepiro",
  "SneakyManny",
  "SneakyBryan",
  "Curbzz",
];

export const getUser = (user) => {
  return DISCORD_MEMBERS.filter((u) => u === user)[0];
}

export const userNameSpecialInteractions = (user) => {
  const userName = DISCORD_MEMBERS.filter(u => u === user)[0];
  switch (userName) {
    case "decimo": {
      const interactions = [
        "xavier no te lusca q te parto alante de to el mundo",
        "alguien q llame a Carol por favor",
        "chama hasta q no me pagues los 1,000 cañas q me debes de chipotle no te voy a responder",
        "quien pinga mando al fidiador este a hablar",
        "asere la gente de regla como les gusta lucirse cuando llegan al yuma",
        "iDecimo more like iStayinGoldFor10Years",
        "q welta mr flavor of the month LMAO",
        "LOL i heard garen adc is meta now trust",
        "chama cuando llegues a platinum me hablas lmaoooooooooooo",
        "cuando xavier nacio el doctor le dio una galleta a la pura por feo",
        "xavier una vez entro a una competencia de feos y lo botaron como aceptaban profesionales lmaoooooooooooooooooooo",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "Inserted": {
      const interactions = [
        "caballero por favor q johnny se va a tiltear",
        "chama me hablas despues q me pongas unos roblox jejejejejejeje",
        "caballero no le hagan caso a johnny q el tipo esta bajando herbalife",
        "taigel yo no hablo con pinareños",
        "cuando johnny nacio, frankestein pidio la baja jejejeje",
        "a johnny no lo parieron, le metio un rage quit a la barriga de la pura lmaooo",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "Gauteke": {
      const interactions = [
        "caballero saquen a jose",
        "oye q alguien mueva a jose pa AFK",
        "asere pa decirte la verdad yo con los cafre no me entiendo",
        "jose no me desmoralize al chat por favor",
        "oye baneen a jose por favor",
        "q es la q papi la gente de bayamon",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "SneakyManny": {
      const interactions = [
        "caballero busquenle un champion a ramses que se reviva cada vez q lo maten y que las muertes no le cuenten jejejeje",
        "yo na ma hablo con gente q se haigan muerto menos de 10 veces por juego",
        "no ramses tu te tiltea mucho",
        "oye checkeenme ahi cuantas veces se ha muerto ramses",
        "hablate master baiter",
        "bueno bueno el q viene ahi es aristides el q viene ahora es aristides",
        "q welta el timba",
        "oye siiiiiiiiiiiiiii q ese es ramses pinga",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "Sepiro": {
      const interactions = [
        "Sephiro me hace falta q me le eches azucar al cafe consorte",
        "mi hermano pa decirte la verdad tengo tremenda perra hambre tu me puedes calentar un hotpocket el mio?",
        "sephiro el fideador de rechala",
        "chama pa hablar conmigo tienes q tener por lo menos 200 luca en talco",
        "sephiro tu no me puedes hacer commands hasta q jose no la eche en dota contigo",
        "q welta sephirito jejejeje",
        "hablate sephiro"
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "SneakyBryan": {
      const interactions = [
        "hablate the most taigel",
        "taigel si no comes te vas a desaparecer",
        "oe siiiiiiiii",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "Curbzz": {
      const interactions = [
        "alex no estoy pa tu fidiadera hoy",
        "ay diooo se estan reportando la gente de caracas",
        "caballero sin son mas de las 8 eso no es alex, trust",
        "q welta puro life",
        "aqui llego the second best baseball player in discord",
        "talk to me once you're back in miami guy",
        "oye siiiiii la gente de un 135 lb bench press",
      ]
      return interactions[getRandomIndex(interactions.length)];
    }
    case "xDAVIDx": {
        return "yo si te descargo el mio"
    }
    default:
        return Greetings();
  }
};
