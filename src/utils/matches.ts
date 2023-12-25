import { PlayerType } from "./player"

export type MatchType = {
  id: string,
  date: string,
  timestamp: number,
  timestamp2: number,
  won: PlayerType,
  lost: PlayerType,
  players: [],
  line: string
}