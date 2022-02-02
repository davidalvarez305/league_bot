import { EntitySchema } from "typeorm";

class Member {
  constructor(id, name, userName, puuid, discordUsername) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.puuid = puuid;
    this.discordUsername = discordUsername;
  }
}

export const Members = new EntitySchema({
  name: "Member",
  target: Member,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    userName: {
      type: "varchar",
    },
    puuid: {
      type: "varchar",
    },
    discordUsername: {
      type: "varchar",
    },
  },
});
