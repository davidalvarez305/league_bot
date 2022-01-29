import { config } from "./config.js";

export const API_KEY = config.API_KEY;

export const PLAYER_NAMES = [
  {
    userName: "iDecimo",
    puuid:
      "8cGyKm_9vXdz_7718cYLAmH6f35UNIWqqrAn5CZ6NJO5mk00i76VeiYFY45XeVnPVFKI8Cd_qwl5aw",
    discordUsername: "decimo",
  },
  {
    userName: "lnserted",
    puuid:
      "zQZwVNVzix5PHFl5Os9qX3FI9HYevAwtKkp6bjyEoNPg3vVl07iMATJpf8xBqUjTF-deovWh0HKKVA",
    discordUsername: "Inserted",
  },
  {
    userName: "Sneakymanny",
    puuid:
      "ZYptTNv7DYLCMzm28-F9EJRh75PUY9lMm7BOqmjJJgEFJz-aKjb0-hUxJe8k-R2H0Pl7MWuX4xRazg",
    discordUsername: "SneakyManny",
  },
];

export const LEAGUE_ROUTES = {
  PLAYER_MATCH_HISTORY_BY_PUUID:
    "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
  MATCH_BY_ID: "https://americas.api.riotgames.com/lol/match/v5/matches/",
};

export const BOT_PREFIX = /^\$asere/gm
