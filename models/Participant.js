import { EntitySchema } from "typeorm";

class Participant {
  constructor(
    assists,
    baronKills,
    champExperience,
    champLevel,
    championId,
    championName,
    championTransform,
    consumablesPurchased,
    damageDealtToBuildings,
    damageDealtToObjectives,
    damageDealtToTurrets,
    damageSelfMitigated,
    deaths,
    detectorWardsPlaced,
    doubleKills,
    dragonKills,
    firstBloodAssist,
    firstBloodKill,
    firstTowerAssist,
    firstTowerKill,
    gameEndedInEarlySurrender,
    gameEndedInSurrender,
    goldEarned,
    goldSpent,
    individualPosition,
    inhibitorKills,
    inhibitorTakedowns,
    inhibitorsLost,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    itemsPurchased,
    killingSprees,
    kills,
    lane,
    largestCriticalStrike,
    largestKillingSpree,
    largestMultiKill,
    longestTimeSpentLiving,
    magicDamageDealt,
    magicDamageDealtToChampions,
    magicDamageTaken,
    neutralMinionsKilled,
    nexusKills,
    nexusLost,
    nexusTakedowns,
    objectivesStolen,
    objectivesStolenAssists,
    participantId,
    pentaKills,
    perks,
    physicalDamageDealt,
    physicalDamageDealtToChampions,
    physicalDamageTaken,
    profileIcon,
    puuid,
    quadraKills,
    riotIdName,
    riotIdTagline,
    role,
    sightWardsBoughtInGame,
    spell1Casts,
    spell2Casts,
    spell3Casts,
    spell4Casts,
    summoner1Casts,
    summoner2Casts,
    summoner1Id,
    summoner2Id,
    summonerId,
    summonerLevel,
    summonerName,
    teamEarlySurrendered,
    teamId,
    teamPosition,
    timeCCingOthers,
    timePlayed,
    totalDamageDealt,
    totalDamageDealtToChampions,
    totalDamageShieldedOnTeammates,
    totalDamageTaken,
    totalHeal,
    totalHealsOnTeammates,
    totalMinionsKilled,
    totalTimeCCDealt,
    totalTimeSpentDead,
    totalUnitsHealed,
    tripleKills,
    trueDamageDealt,
    trueDamageDealtToChampions,
    trueDamageTaken,
    turretKills,
    turretTakedowns,
    turretsLost,
    unrealKills,
    visionScore,
    visionWardsBoughtInGame,
    wardsKilled,
    wardsPlaced,
    win
  ) {
    this.assists = assists;
    this.baronKills = baronKills;
    this.champExperience = champExperience;
    this.champLevel = champLevel;
    this.championId = championId;
    this.championName = championName;
    this.championTransform = championTransform;
    this.consumablesPurchased = consumablesPurchased;
    this.damageDealtToBuildings = damageDealtToBuildings;
    this.damageDealtToObjectives = damageDealtToObjectives;
    this.damageDealtToTurrets = damageDealtToTurrets;
    this.damageSelfMitigated = damageSelfMitigated;
    this.deaths = deaths;
    this.detectorWardsPlaced = detectorWardsPlaced;
    this.doubleKills = doubleKills;
    this.dragonKills = dragonKills;
    this.firstBloodAssist = firstBloodAssist;
    this.firstBloodKill = firstBloodKill;
    this.firstTowerAssist = firstTowerAssist;
    this.firstTowerKill = firstTowerKill;
    this.gameEndedInEarlySurrender = gameEndedInEarlySurrender;
    this.gameEndedInSurrender = gameEndedInSurrender;
    this.goldEarned = goldEarned;
    this.goldSpent = goldSpent;
    this.individualPosition = individualPosition;
    this.inhibitorKills = inhibitorKills;
    this.inhibitorTakedowns = inhibitorTakedowns;
    this.inhibitorsLost = inhibitorsLost;
    this.item0 = item0;
    this.item1 = item1;
    this.item2 = item2;
    this.item3 = item3;
    this.item4 = item4;
    this.item5 = item5;
    this.item6 = item6;
    this.itemsPurchased = itemsPurchased;
    this.killingSprees = killingSprees;
    this.kills = kills;
    this.lane = lane;
    this.largestCriticalStrike = largestCriticalStrike;
    this.largestKillingSpree = largestKillingSpree;
    this.largestMultiKill = largestMultiKill;
    this.longestTimeSpentLiving = longestTimeSpentLiving;
    this.magicDamageDealt = magicDamageDealt;
    this.magicDamageDealtToChampions = magicDamageDealtToChampions;
    this.magicDamageTaken = magicDamageTaken;
    this.neutralMinionsKilled = neutralMinionsKilled;
    this.nexusKills = nexusKills;
    this.nexusLost = nexusLost;
    this.nexusTakedowns = nexusTakedowns;
    this.objectivesStolen = objectivesStolen;
    this.objectivesStolenAssists = objectivesStolenAssists;
    this.participantId = participantId;
    this.pentaKills = pentaKills;
    this.perks = perks;
    this.physicalDamageDealt = physicalDamageDealt;
    this.physicalDamageDealtToChampions = physicalDamageDealtToChampions;
    this.physicalDamageTaken = physicalDamageTaken;
    this.profileIcon = profileIcon;
    this.puuid = puuid;
    this.quadraKills = quadraKills;
    this.riotIdName = riotIdName;
    this.riotIdTagline = riotIdTagline;
    this.role = role;
    this.sightWardsBoughtInGame = sightWardsBoughtInGame;
    this.spell1Casts = spell1Casts;
    this.spell2Casts = spell2Casts;
    this.spell3Casts = spell3Casts;
    this.spell4Casts = spell4Casts;
    this.summoner1Casts = summoner1Casts;
    this.summoner2Casts = summoner2Casts;
    this.summoner1Id = summoner1Id;
    this.summoner2Id = summoner2Id;
    this.summonerId = summonerId;
    this.summonerLevel = summonerLevel;
    this.summonerName = summonerName;
    this.teamEarlySurrendered = teamEarlySurrendered;
    this.teamId = teamId;
    this.teamPosition = teamPosition;
    this.timeCCingOthers = timeCCingOthers;
    this.timePlayed = timePlayed;
    this.totalDamageDealt = totalDamageDealt;
    this.totalDamageDealtToChampions = totalDamageDealtToChampions;
    this.totalDamageShieldedOnTeammates = totalDamageShieldedOnTeammates;
    this.totalDamageTaken = totalDamageTaken;
    this.totalHeal = totalHeal;
    this.totalHealsOnTeammates = totalHealsOnTeammates;
    this.totalMinionsKilled = totalMinionsKilled;
    this.totalTimeCCDealt = totalTimeCCDealt;
    this.totalTimeSpentDead = totalTimeSpentDead;
    this.totalUnitsHealed = totalUnitsHealed;
    this.tripleKills = tripleKills;
    this.trueDamageDealt = trueDamageDealt;
    this.trueDamageDealtToChampions = trueDamageDealtToChampions;
    this.trueDamageTaken = trueDamageTaken;
    this.turretKills = turretKills;
    this.turretTakedowns = turretTakedowns;
    this.turretsLost = turretsLost;
    this.unrealKills = unrealKills;
    this.visionScore = visionScore;
    this.visionWardsBoughtInGame = visionWardsBoughtInGame;
    this.wardsKilled = wardsKilled;
    this.wardsPlaced = wardsPlaced;
    this.win = win;
  }
}

export const Participants = new EntitySchema({
  name: "Participant",
  target: Participant,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    assists: {
      type: "int",
    },
    baronKills: {
      type: "int",
    },
    champExperience: {
      type: "int",
    },
    champLevel: {
      type: "int",
    },
    championId: {
      type: "int",
    },
    championName: {
      type: "varchar",
    },
    championTransform: {
      type: "int",
    },
    consumablesPurchased: {
      type: "int",
    },
    damageDealtToBuildings: {
      type: "int",
    },
    damageDealtToObjectives: {
      type: "int",
    },
    damageDealtToTurrets: {
      type: "int",
    },
    damageSelfMitigated: {
      type: "int",
    },
    deaths: {
      type: "int",
    },
    detectorWardsPlaced: {
      type: "int",
    },
    doubleKills: {
      type: "int",
    },
    dragonKills: {
      type: "int",
    },
    firstBloodAssist: {
      type: "boolean",
    },
    firstBloodKill: {
      type: "boolean",
    },
    firstTowerAssist: {
      type: "boolean",
    },
    firstTowerKill: {
      type: "boolean",
    },
    gameEndedInEarlySurrender: {
      type: "boolean",
    },
    gameEndedInSurrender: {
      type: "boolean",
    },
    goldEarned: {
      type: "int",
    },
    goldSpent: {
      type: "int",
    },
    individualPosition: {
      type: "varchar",
    },
    inhibitorKills: {
      type: "int",
    },
    inhibitorTakedowns: {
      type: "int",
    },
    inhibitorsLost: {
      type: "int",
    },
    item0: {
      type: "int",
    },
    item1: {
      type: "int",
    },
    item2: {
      type: "int",
    },
    item3: {
      type: "int",
    },
    item4: {
      type: "int",
    },
    item5: {
      type: "int",
    },
    item6: {
      type: "int",
    },
    itemsPurchased: {
      type: "int",
    },
    killingSprees: {
      type: "int",
    },
    kills: {
      type: "int",
    },
    lane: {
      type: "varchar",
    },
    largestCriticalStrike: {
      type: "int",
    },
    largestKillingSpree: {
      type: "int",
    },
    largestMultiKill: {
      type: "int",
    },
    longestTimeSpentLiving: {
      type: "int",
    },
    magicDamageDealt: {
      type: "int",
    },
    magicDamageDealtToChampions: {
      type: "int",
    },
    magicDamageTaken: {
      type: "int",
    },
    neutralMinionsKilled: {
      type: "int",
    },
    nexusKills: {
      type: "int",
    },
    nexusLost: {
      type: "int",
    },
    nexusTakedowns: {
      type: "int",
    },
    objectivesStolen: {
      type: "int",
    },
    objectivesStolenAssists: {
      type: "int",
    },
    participantId: {
      type: "int",
    },
    pentaKills: {
      type: "int",
    },
    perks: {
      type: "varchar",
    },
    physicalDamageDealt: {
      type: "int",
    },
    physicalDamageDealtToChampions: {
      type: "int",
    },
    physicalDamageTaken: {
      type: "int",
    },
    profileIcon: {
      type: "int",
    },
    puuid: {
      type: "varchar",
    },
    quadraKills: {
      type: "int",
    },
    riotIdName: {
      type: "varchar",
    },
    riotIdTagline: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
    sightWardsBoughtInGame: {
      type: "int",
    },
    spell1Casts: {
      type: "int",
    },
    spell2Casts: {
      type: "int",
    },
    spell3Casts: {
      type: "int",
    },
    spell4Casts: {
      type: "int",
    },
    summoner1Casts: {
      type: "int",
    },
    summoner2Casts: {
      type: "int",
    },
    summoner1Id: {
      type: "int",
    },
    summoner2Id: {
      type: "int",
    },
    summonerId: {
      type: "varchar",
    },
    summonerLevel: {
      type: "int",
    },
    summonerName: {
      type: "varchar",
    },
    teamEarlySurrendered: {
      type: "boolean",
    },
    teamId: {
      type: "int",
    },
    teamPosition: {
      type: "varchar",
    },
    timeCCingOthers: {
      type: "int",
    },
    timePlayed: {
      type: "int",
    },
    totalDamageDealt: {
      type: "int",
    },
    totalDamageDealtToChampions: {
      type: "int",
    },
    totalDamageShieldedOnTeammates: {
      type: "int",
    },
    totalDamageTaken: {
      type: "int",
    },
    totalHeal: {
      type: "int",
    },
    totalHealsOnTeammates: {
      type: "int",
    },
    totalMinionsKilled: {
      type: "int",
    },
    totalTimeCCDealt: {
      type: "int",
    },
    totalTimeSpentDead: {
      type: "int",
    },
    totalUnitsHealed: {
      type: "int",
    },
    tripleKills: {
      type: "int",
    },
    trueDamageDealt: {
      type: "int",
    },
    trueDamageDealtToChampions: {
      type: "int",
    },
    trueDamageTaken: {
      type: "int",
    },
    turretKills: {
      type: "int",
    },
    turretTakedowns: {
      type: "int",
    },
    turretsLost: {
      type: "int",
    },
    unrealKills: {
      type: "int",
    },
    visionScore: {
      type: "int",
    },
    visionWardsBoughtInGame: {
      type: "int",
    },
    wardsKilled: {
      type: "int",
    },
    wardsPlaced: {
      type: "int",
    },
    win: {
      type: "boolean",
    },
  },
});
