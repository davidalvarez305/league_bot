import { GameInfo } from "./game";

export type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export interface Player {
  name: string;
  userName: string;
  puuid: string;
  discordUsername: string;
};

export interface TrackedPlayer extends Player {
  lastGame: GameInfo | undefined;
  currentStats: PlayerStats | undefined;
  last10Games: boolean[];
}

export type CommandOptions = {
  type: string;
  prompt: string | undefined;
  player: Player | undefined;
  subCommand: string | undefined;
};

export type WinData = {
  wins: number;
  games: number;
  "win rate": number;
  summonerName: string;
};

export type PlayerDetailsResponse = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type MatchData = string[];

export type PlayerStats = {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export type WeeklyData = {
  wins: number;
  games: number;
  kills: number;
  deaths: number;
  summonerName: string;
};

export type KillsData = {
  kills: number;
  deaths: number;
  summonerName: string;
};

export type AverageGameData = {
  totalDamageDealtToChampions: number;
  summonerName: string;
};

export type ChampionData = {
  wins: number;
  "win rate": number;
  games: number;
  damage: number;
  kills: number;
  deaths: number;
  assists: number;
  championName: string;
};

export type MultiData = {
  multiKills: number;
  pentaKills: number;
  summonerName: string;
};

export type TimePlayedData = {
  timePlayed: number;
  summonerName: string;
};

export type RageQuitsData = {
  rageQuits: number;
  summonerName: string;
};

export type DuoData = {
  wr: number;
  players: string | undefined;
  games: number;
  wins: number;
};

export type LeaderboardPlayer = {
  summonerName: string;
  points: number;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};
