import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  userName: string

  @Column()
  puuid: string

  @Column()
  discordUsername: string
};
