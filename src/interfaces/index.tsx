export interface Player {
  name: string;
  position: string;
  teamId: string;
  number: number;
  avatar: string;
  rpg: number;
  spg: number;
  apg: number;
  ppg: number;
}

export interface Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  established: number;
  coach: string;
  manager: string;
  championships: number[];
  players: Player[];
}

export interface TeamArticle {
  id: string;
  title: string;
  date: Date;
}

export interface Article extends TeamArticle {
  body: string;
}
