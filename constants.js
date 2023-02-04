import "dotenv/config"

export const __prod__ = process.env.NODE_ENV === "production";
export const API_KEY = process.env.API_KEY;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CUCU_GUILD_ID = process.env.CUCU_GUILD_ID;
export const OAUTH2_REDIRECT_URL = process.env.OAUTH2_REDIRECT_URL;
export const OPENAI_KEY = process.env.OPENAI_KEY;

// League of Legends & Discord Mapping
export const PLAYER_NAMES = [
  {
    name: "X",
    userName: "iDecimo",
    puuid:
      "zdXka-ykDpri49DO8SJ_8SFb3Nn_rKFm_9aKza43ZvP6BCsLpCF2-180sK75Pu41P5rutgwybsVREA",
    discordUsername: "decimo",
  },
  {
    name: "Johnny",
    userName: "lnserted",
    puuid:
      "e3lTYf-sCrgaT1i_rrhl-sVWcwu0rBpR4_OD2I6HDJd4s-trdtwTSOA47uxT4owS4sALKWZ6pH1KmQ",
    discordUsername: "Inserted",
  },
  {
    name: "Ramses",
    userName: "Sneakymanny",
    puuid:
      "QdjnD_Yp1qNg3kjYxYTLcC8G2jNuIpP1z4olPHgeT9RR8P6sh0rYj4VhJbVPye8Bwk9UmsGNVFrgww",
    discordUsername: "SneakyManny",
  },
  {
    name: "Alex",
    userName: "Curbzz",
    puuid:
      "_d9fqaGpWjCfo8TOV7SLGb0sjT97rVQhNulr5YCJwFct6NRwaWYP4Pd8bcbrX6ot1uGBklrTkuvELQ",
    discordUsername: "Curbzz",
  },
  {
    name: "Andy",
    userName: "andysilva100",
    puuid:
      "KMShRl5tLd4KMEZRZhrYOOcXNU7ytD5l7ILyxPFo567OJ0qf5iay6INURkIxOB_eD5NlNUoX1IvOWg",
    discordUsername: "andysilva100",
  },
  {
    name: "David",
    userName: "EZDubz",
    puuid:
      "ZMCKTsk0iqV2rrh1DFki10UGY42RrV6uXPfp0kqSotfBjYyFhyz72Y1wlWvk3ZIta-ZQWFyF-8DlBA",
    discordUsername: "xDAVIDx",
  },
  {
    name: "Marlon",
    userName: "Marlon skilZ",
    puuid: "Olucnaj87N9veLIAEl6oPCOkK6Z471dlab2-mPIqLkOERBLAyqfxvyasLfgf-lsYuItxROZC3X9S-Q",
    discordUsername: "Marlonb"
  },
  {
    name: "Arturo",
    userName: "Debtz II",
    puuid: "YwN1Xq11BYzZD_ZrjELxji5zF3bh22nBSexwGrIry_XwO5OTXJ6RHyM7uEXcbKOtrGekL240y2Q0rg",
    discordUsername: "Debtz"
  },
  {
    name: "eltalento96",
    userName: "RagExTALENT",
    puuid: "PNiQxL2ewpDF62Yrq9TFOinNqwf3Gk9W4iwNPS9DlBhcpcHQ32JlmBaV6jTcZWR2PC_Hvbrf7Ehzuw",
    discordUsername: "eltalento96"
  }
];


// Riot Game Resource Paths
export const LEAGUE_ROUTES = {
  PLAYER_MATCH_HISTORY_BY_PUUID:
    "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
  MATCH_BY_ID: "https://americas.api.riotgames.com/lol/match/v5/matches/",
  PLAYER_DETAILS: "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/",
  PLAYER_STATS: "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
};

// The Prefix for BOT to Start Listening
export const BOT_PREFIX = /^\$asere/gm;

// The Prefix for 'Rank' Command
export const RANK_COMMAND = /^\$asere [a-zA-Z0-9]+ rank/gm;

// The Prefix for 'Champions' Command
export const CHAMPION_COMMAND = /^\$asere [a-zA-Z0-9]+ champions/gm;

// Regex for Matching Postgres camelCase
export const POSTGRES_CAMEL_CASE = /^[a-z0-9]+([A-Z]+[a-z]+)+/gm

// Fields for Participant Table
export const PARTICIPANT_FIELDS = [
    "assists",
    "baronKills",
    "champExperience",
    "champLevel",
    "championId",
    "championName",
    "championTransform",
    "consumablesPurchased",
    "damageDealtToBuildings",
    "damageDealtToObjectives",
    "damageDealtToTurrets",
    "damageSelfMitigated",
    "deaths",
    "detectorWardsPlaced",
    "doubleKills",
    "dragonKills",
    "firstBloodAssist",
    "firstBloodKill",
    "firstTowerAssist",
    "firstTowerKill",
    "gameEndedInEarlySurrender",
    "gameEndedInSurrender",
    "goldEarned",
    "goldSpent",
    "individualPosition",
    "inhibitorKills",
    "inhibitorTakedowns",
    "inhibitorsLost",
    "item0",
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "itemsPurchased",
    "killingSprees",
    "kills",
    "lane",
    "largestCriticalStrike",
    "largestKillingSpree",
    "largestMultiKill",
    "longestTimeSpentLiving",
    "magicDamageDealt",
    "magicDamageDealtToChampions",
    "magicDamageTaken",
    "neutralMinionsKilled",
    "nexusKills",
    "nexusLost",
    "nexusTakedowns",
    "objectivesStolen",
    "objectivesStolenAssists",
    "participantId",
    "pentaKills",
    "perks",
    "physicalDamageDealt",
    "physicalDamageDealtToChampions",
    "physicalDamageTaken",
    "profileIcon",
    "puuid",
    "quadraKills",
    "riotIdName",
    "riotIdTagline",
    "role",
    "sightWardsBoughtInGame",
    "spell1Casts",
    "spell2Casts",
    "spell3Casts",
    "spell4Casts",
    "summoner1Casts",
    "summoner2Casts",
    "summoner1Id",
    "summoner2Id",
    "summonerId",
    "summonerLevel",
    "summonerName",
    "teamEarlySurrendered",
    "teamId",
    "teamPosition",
    "timeCCingOthers",
    "timePlayed",
    "totalDamageDealt",
    "totalDamageDealtToChampions",
    "totalDamageShieldedOnTeammates",
    "totalDamageTaken",
    "totalHeal",
    "totalHealsOnTeammates",
    "totalMinionsKilled",
    "totalTimeCCDealt",
    "totalTimeSpentDead",
    "totalUnitsHealed",
    "tripleKills",
    "trueDamageDealt",
    "trueDamageDealtToChampions",
    "trueDamageTaken",
    "turretKills",
    "turretTakedowns",
    "turretsLost",
    "unrealKills",
    "visionScore",
    "visionWardsBoughtInGame",
    "wardsKilled",
    "wardsPlaced",
    "win"
]