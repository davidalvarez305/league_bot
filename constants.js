import { config } from "./config.js";

export const API_KEY = config.API_KEY;

// League of Legends & Discord Mapping
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
  {
    userName: "Curbzz",
    puuid:
      "1LsMq9Imno5WZfg7h4DQEZs8o-3W9P0xqvd-ng0NQOuIianuV3CK54ER9SCyAH36pF0Dm0ck35oZkg",
    discordUsername: "Curbzz",
  },
  {
    userName: "andysilva100",
    puuid:
      "4V-ndI3VJ-AVUULQYRrgo7-D7vHI32yan7pbykolyskyU_mhqoXQMF3rkKyy686auUv1JW1dh6QtWA",
    discordUsername: "andysilva100",
  },
  {
    userName: "EZDubz",
    puuid:
      "MbOl1oYwZpVBRM6QYirWIVq28RSFZxH4SnvdUt7vdYYim_VWgguDNOxHgR6HiZdN_ub5Sy9WhK7LRQ",
    discordUsername: "xDAVIDx",
  },
  {
    userName: "SoulTakerRiven",
    puuid: "2myRtNY4bW3B4xaffda3qT4QnbRooSAFUYu3vN97iiURqw4jrRaaqJIL7TLlwxhhUqkiLg2LkrgnDw",
    discordUsername: "CombatDay",
  },
];


// Riot Game Resource Paths
export const LEAGUE_ROUTES = {
  PLAYER_MATCH_HISTORY_BY_PUUID:
    "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
  MATCH_BY_ID: "https://americas.api.riotgames.com/lol/match/v5/matches/",
};

// The Prefix for BOT to Start Listening
export const BOT_PREFIX = /^\$asere/gm;

// ID of Discord Server
export const CUCU_GUILD_ID = '130528155281653760'