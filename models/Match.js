import { EntitySchema } from "typeorm";

class Match {
  constructor(
    id,
    matchId,
    gameCreation,
    gameDuration,
    gameEndTimestamp,
    gameId,
    gameMode,
    gameName,
    gameStartTimestamp,
    gameType,
    gameVersion,
    mapId,
    platformId,
    queueId,
    tournamentCode
  ) {
    this.id = id;
    this.matchId = matchId;
    this.gameCreation = gameCreation;
    this.gameDuration = gameDuration;
    this.gameEndTimestamp = gameEndTimestamp;
    this.gameId = gameId;
    this.gameMode = gameMode;
    this.gameName = gameName;
    this.gameStartTimestamp = gameStartTimestamp;
    this.gameType = gameType;
    this.gameVersion = gameVersion;
    this.mapId = mapId;
    this.platformId = platformId;
    this.queueId = queueId;
    this.tournamentCode = tournamentCode;
  }
}

export const Match = new EntitySchema({
  name: "Match",
  target: Match,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    matchId: {
      type: "varchar",
    },
    gameCreation: {
      type: "bigint",
    },
    gameDuration: {
      type: "bigint",
    },
    gameEndTimestamp: {
      type: "bigint",
    },
    gameId: {
      type: "bigint",
    },
    gameMode: {
      type: "varchar",
    },
    gameName: {
      type: "varchar",
    },
    gameStartTimestamp: {
      type: "bigint",
    },
    gameType: {
      type: "varchar",
    },
    gameVersion: {
      type: "varchar",
    },
    mapId: {
      type: "int",
    },
    platformId: {
      type: "varchar",
    },
    queueId: {
      type: "varchar",
    },
    tournamentCode: {
      type: "varchar",
    },
  },
});
