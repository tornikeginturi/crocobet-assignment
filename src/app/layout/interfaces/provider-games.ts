import { Game } from './game';

export interface ProviderGames {
  type: string;
  provider: string;
  vendor: string;
  iframeW: number;
  iframeH: number;
  name: string;
  order: number;
  tags: any[];
  games: Game[];
  totalGames: number;
}
