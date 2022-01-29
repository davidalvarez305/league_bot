import express from "express";
import { Bot } from "../controllers/bot.js";
const router = express.Router();

// Get Player's Match History
router.get('/', Bot);

export default router;