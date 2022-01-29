import express from "express";
import { GetPlayerMatchHistory } from "../controllers/league.js";
const router = express.Router();

// Get Player's Match History
router.get('/history/:puuid', GetPlayerMatchHistory);

export default router;