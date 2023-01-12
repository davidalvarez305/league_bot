import "reflect-metadata";
import { DataSource } from "typeorm";
import { Members } from "../models/Member.js";
import { Participants } from "../models/Participant.js";

// Initialize PostgreSQL
export const AppDataSource = new DataSource({
  type: "postgres",
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  synchronize: true,
  entities: [Members, Participants],
});
