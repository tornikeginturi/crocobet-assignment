export interface Game {
  tags: any[];
  game_id: string;
  name: string;
  image: string;
  url: string;
  provider: string;
  order: number;
  providerName: string;
  imageSet: ImageSet;
  favoriteCount: number;
  gameId: string;
  image2: string;
}

export interface ImageSet {
  blurhash: any;
  original: string;
  webp: string;
}
