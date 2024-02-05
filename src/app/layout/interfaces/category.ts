import { Game } from './game';

export interface Category {
  type: string;
  category: string;
  platform: string;
  name: string;
  order: number;
  games: Game[];
  totalGames: number;
}
