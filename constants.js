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
    userName: "Inserted",
    puuid:
      "_egtZDNwIy2bW6GeLKV6Wdibp_lNjsGgUfvzMZceXvQBNISJwT29joViVzZZq_kDNbEWvg-s8_gr2A",
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

export const BOT_PREFIX = '$asere'
