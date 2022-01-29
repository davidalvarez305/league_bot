import express from "express";
import { GetPlayerLastMatchData } from "../controllers/league.js";
const router = express.Router();

// Get Player's Match History
router.get('/history/:puuid', GetPlayerLastMatchData);

export default router;