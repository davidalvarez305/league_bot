import { getRandomIndex } from "../utils/getRandomIndex.js"
import { GREETINGS } from "../utils/bot/greetings.js";
import { GUAPERIA } from "../utils/bot/guaperia.js";

export const Greetings = () => {
    return GREETINGS[getRandomIndex(GREETINGS.length)];
}

export const Guaperia = () => {
    return GUAPERIA[getRandomIndex(GUAPERIA.length)];
}