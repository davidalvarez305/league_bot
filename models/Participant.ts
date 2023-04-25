import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  timeStamp: number;

  @Column()
  matchId: string;

  @Column({ nullable: true, default: 0 })
  allInPings: number;

  @Column({ nullable: true, default: 0 })
  assistMePings: number;

  @Column()
  assists: number;

  @Column({ nullable: true, default: 0 })
  baitPings: number;

  @Column()
  baronKills: number;

  @Column({ nullable: true, default: 0 })
  basicPings: number;

  @Column({ nullable: true, default: 0 })
  bountyLevel: number;

  @Column()
  champExperience: number;

  @Column()
  champLevel: number;

  @Column()
  championId: number;

  @Column()
  championName: string;

  @Column()
  championTransform: number;

  @Column({ nullable: true, default: 0 })
  commandPings: number;

  @Column()
  consumablesPurchased: number;

  @Column()
  damageDealtToBuildings: number;

  @Column()
  damageDealtToObjectives: number;

  @Column()
  damageDealtToTurrets: number;

  @Column()
  damageSelfMitigated: number;

  @Column({ nullable: true, default: 0 })
  dangerPings: number;

  @Column()
  deaths: number;

  @Column()
  detectorWardsPlaced: number;

  @Column()
  doubleKills: number;

  @Column()
  dragonKills: number;

  @Column({ nullable: true, default: 0 })
  eligibleForProgression: boolean;

  @Column({ nullable: true, default: 0 })
  enemyMissingPings: number;

  @Column({ nullable: true, default: 0 })
  enemyVisionPings: number;

  @Column()
  firstBloodAssist: boolean;

  @Column()
  firstBloodKill: boolean;

  @Column()
  firstTowerAssist: boolean;

  @Column()
  firstTowerKill: boolean;

  @Column()
  gameEndedInEarlySurrender: boolean;

  @Column()
  gameEndedInSurrender: boolean;

  @Column({ nullable: true, default: 0 })
  getBackPings: number;

  @Column()
  goldEarned: number;

  @Column()
  goldSpent: number;

  @Column({ nullable: true, default: 0 })
  holdPings: number;

  @Column()
  individualPosition: string;

  @Column()
  inhibitorKills: number;

  @Column()
  inhibitorTakedowns: number;

  @Column()
  inhibitorsLost: number;

  @Column()
  item0: number;

  @Column()
  item1: number;

  @Column()
  item2: number;

  @Column()
  item3: number;

  @Column()
  item4: number;

  @Column()
  item5: number;

  @Column()
  item6: number;

  @Column()
  itemsPurchased: number;

  @Column()
  killingSprees: number;

  @Column()
  kills: number;

  @Column()
  lane: string;

  @Column()
  largestCriticalStrike: number;

  @Column()
  largestKillingSpree: number;

  @Column()
  largestMultiKill: number;

  @Column()
  longestTimeSpentLiving: number;

  @Column()
  magicDamageDealt: number;

  @Column()
  magicDamageDealtToChampions: number;

  @Column()
  magicDamageTaken: number;

  @Column({ nullable: true, default: 0 })
  needVisionPings: number;

  @Column()
  neutralMinionsKilled: number;

  @Column()
  nexusKills: number;

  @Column()
  nexusLost: number;

  @Column()
  nexusTakedowns: number;

  @Column()
  objectivesStolen: number;

  @Column()
  objectivesStolenAssists: number;

  @Column({ nullable: true, default: 0 })
  onMyWayPings: number;

  @Column()
  participantId: number;

  @Column()
  pentaKills: number;

  @Column()
  perks: string;

  @Column()
  physicalDamageDealt: number;

  @Column()
  physicalDamageDealtToChampions: number;

  @Column()
  physicalDamageTaken: number;

  @Column()
  profileIcon: number;

  @Column({ nullable: true, default: 0 })
  pushPings: number;

  @Column()
  puuid: string;

  @Column()
  quadraKills: number;

  @Column()
  riotIdName: string;

  @Column()
  riotIdTagline: string;

  @Column()
  role: string;

  @Column()
  sightWardsBoughtInGame: number;

  @Column()
  spell1Casts: number;

  @Column()
  spell2Casts: number;

  @Column()
  spell3Casts: number;

  @Column()
  spell4Casts: number;

  @Column()
  summoner1Casts: number;

  @Column()
  summoner1Id: number;

  @Column()
  summoner2Casts: number;

  @Column()
  summoner2Id: number;

  @Column()
  summonerId: string;

  @Column()
  summonerLevel: number;

  @Column()
  summonerName: string;

  @Column()
  teamEarlySurrendered: boolean;

  @Column()
  teamId: number;

  @Column()
  teamPosition: string;

  @Column()
  timeCCingOthers: number;

  @Column()
  timePlayed: number;

  @Column()
  totalDamageDealt: number;

  @Column()
  totalDamageDealtToChampions: number;

  @Column()
  totalDamageShieldedOnTeammates: number;

  @Column()
  totalDamageTaken: number;

  @Column()
  totalHeal: number;

  @Column()
  totalHealsOnTeammates: number;

  @Column()
  totalMinionsKilled: number;

  @Column()
  totalTimeCCDealt: number;

  @Column()
  totalTimeSpentDead: number;

  @Column()
  totalUnitsHealed: number;

  @Column()
  tripleKills: number;

  @Column()
  trueDamageDealt: number;

  @Column()
  trueDamageDealtToChampions: number;

  @Column()
  trueDamageTaken: number;

  @Column()
  turretKills: number;

  @Column()
  turretTakedowns: number;

  @Column()
  turretsLost: number;

  @Column()
  unrealKills: number;

  @Column({ nullable: true, default: 0 })
  visionClearedPings: number;

  @Column()
  visionScore: number;

  @Column()
  visionWardsBoughtInGame: number;

  @Column()
  wardsKilled: number;

  @Column()
  wardsPlaced: number;

  @Column()
  win: boolean;
}
