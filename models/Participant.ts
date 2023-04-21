import { EntitySchema } from "typeorm";
import { Participant as ParticipantType } from "../types/game";

class SummonerParticipant {
  constructor(
    timeStamp: number,
    matchId: string,
    participant: ParticipantType
  ) {
    this.timeStamp = timeStamp;
    this.matchId = matchId;
    this.assists = participant.assists;
    this.baronKills = participant.baronKills;
    this.champExperience = participant.champExperience;
    this.champLevel = participant.champLevel;
    this.championId = participant.championId;
    this.championName = participant.championName;
    this.championTransform = participant.championTransform;
    this.consumablesPurchased = participant.consumablesPurchased;
    this.damageDealtToBuildings = participant.damageDealtToBuildings;
    this.damageDealtToObjectives = participant.damageDealtToObjectives;
    this.damageDealtToTurrets = participant.damageDealtToTurrets;
    this.damageSelfMitigated = participant.damageSelfMitigated;
    this.deaths = participant.deaths;
    this.detectorWardsPlaced = participant.detectorWardsPlaced;
    this.doubleKills = participant.doubleKills;
    this.dragonKills = participant.dragonKills;
    this.firstBloodAssist = participant.firstBloodAssist;
    this.firstBloodKill = participant.firstBloodKill;
    this.firstTowerAssist = participant.firstTowerAssist;
    this.firstTowerKill = participant.firstTowerKill;
    this.gameEndedInEarlySurrender = participant.gameEndedInEarlySurrender;
    this.gameEndedInSurrender = participant.gameEndedInSurrender;
    this.goldEarned = participant.goldEarned;
    this.goldSpent = participant.goldSpent;
    this.individualPosition = participant.individualPosition;
    this.inhibitorKills = participant.inhibitorKills;
    this.inhibitorTakedowns = participant.inhibitorTakedowns;
    this.inhibitorsLost = participant.inhibitorsLost;
    this.item0 = participant.item0;
    this.item1 = participant.item1;
    this.item2 = participant.item2;
    this.item3 = participant.item3;
    this.item4 = participant.item4;
    this.item5 = participant.item5;
    this.item6 = participant.item6;
    this.itemsPurchased = participant.itemsPurchased;
    this.killingSprees = participant.killingSprees;
    this.kills = participant.kills;
    this.lane = participant.lane;
    this.largestCriticalStrike = participant.largestCriticalStrike;
    this.largestKillingSpree = participant.largestKillingSpree;
    this.largestMultiKill = participant.largestMultiKill;
    this.longestTimeSpentLiving = participant.longestTimeSpentLiving;
    this.magicDamageDealt = participant.magicDamageDealt;
    this.magicDamageDealtToChampions = participant.magicDamageDealtToChampions;
    this.magicDamageTaken = participant.magicDamageTaken;
    this.neutralMinionsKilled = participant.neutralMinionsKilled;
    this.nexusKills = participant.nexusKills;
    this.nexusLost = participant.nexusLost;
    this.nexusTakedowns = participant.nexusTakedowns;
    this.objectivesStolen = participant.objectivesStolen;
    this.objectivesStolenAssists = participant.objectivesStolenAssists;
    this.participantId = participant.participantId;
    this.pentaKills = participant.pentaKills;
    this.perks = participant.perks;
    this.physicalDamageDealt = participant.physicalDamageDealt;
    this.physicalDamageDealtToChampions = participant.physicalDamageDealtToChampions;
    this.physicalDamageTaken = participant.physicalDamageTaken;
    this.profileIcon = participant.profileIcon;
    this.puuid = participant.puuid;
    this.quadraKills = participant.quadraKills;
    this.riotIdName = participant.riotIdName;
    this.riotIdTagline = participant.riotIdTagline;
    this.role = participant.role;
    this.sightWardsBoughtInGame = participant.sightWardsBoughtInGame;
    this.spell1Casts = participant.spell1Casts;
    this.spell2Casts = participant.spell2Casts;
    this.spell3Casts = participant.spell3Casts;
    this.spell4Casts = participant.spell4Casts;
    this.summoner1Casts = participant.summoner1Casts;
    this.summoner2Casts = participant.summoner2Casts;
    this.summoner1Id = participant.summoner1Id;
    this.summoner2Id = participant.summoner2Id;
    this.summonerId = participant.summonerId;
    this.summonerLevel = participant.summonerLevel;
    this.summonerName = participant.summonerName;
    this.teamEarlySurrendered = participant.teamEarlySurrendered;
    this.teamId = participant.teamId;
    this.teamPosition = participant.teamPosition;
    this.timeCCingOthers = participant.timeCCingOthers;
    this.timePlayed = participant.timePlayed;
    this.totalDamageDealt = participant.totalDamageDealt;
    this.totalDamageDealtToChampions = participant.totalDamageDealtToChampions;
    this.totalDamageShieldedOnTeammates = participant.totalDamageShieldedOnTeammates;
    this.totalDamageTaken = participant.totalDamageTaken;
    this.totalHeal = participant.totalHeal;
    this.totalHealsOnTeammates = participant.totalHealsOnTeammates;
    this.totalMinionsKilled = participant.totalMinionsKilled;
    this.totalTimeCCDealt = participant.totalTimeCCDealt;
    this.totalTimeSpentDead = participant.totalTimeSpentDead;
    this.totalUnitsHealed = participant.totalUnitsHealed;
    this.tripleKills = participant.tripleKills;
    this.trueDamageDealt = participant.trueDamageDealt;
    this.trueDamageDealtToChampions = participant.trueDamageDealtToChampions;
    this.trueDamageTaken = participant.trueDamageTaken;
    this.turretKills = participant.turretKills;
    this.turretTakedowns = participant.turretTakedowns;
    this.turretsLost = participant.turretsLost;
    this.unrealKills = participant.unrealKills;
    this.visionScore = participant.visionScore;
    this.visionWardsBoughtInGame = participant.visionWardsBoughtInGame;
    this.wardsKilled = participant.wardsKilled;
    this.wardsPlaced = participant.wardsPlaced;
    this.win = participant.win;
  }
}

export const Participants = new EntitySchema({
  name: "Participant",
  target: SummonerParticipant,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    timeStamp: {
      type: "bigint",
    },
    matchId: {
      type: "varchar",
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
