import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "../models/Member";
import { Participant } from "../models/Participant";

// Initialize PostgreSQL
export const AppDataSource = new DataSource({
  type: "postgres",
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  host: process.env.POSTGRES_HOST,
  // synchronize: true,
  entities: [Member, Participant],
});
