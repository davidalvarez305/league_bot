import "reflect-metadata";
import { DataSource } from "typeorm";
import { Members } from "../models/Member.js";
import { Participants } from "../models/Participant.js";

// Initialize PostgreSQL
export const AppDataSource = new DataSource({
  type: "postgres",
  username: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  host: process.env.PGHOST,
  synchronize: true,
  entities: [Members, Participants],
});
