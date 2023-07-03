export type Health = 'HEALTHY' | 'INJURED' | 'DYING' | 'DEAD';
export type HealthChange = 'HEALED' | 'HURT';
export type GameStatus = 'UNBEGUN' | 'ONGOING' | 'FINISHED';

export interface Survivor {
  id: string;
  name: string;
  health: Health;
  progress: number; // heal measurement
  numHealers: number;
  kind: 'SURVIVOR';
}

export interface Killer {
  id: string;
  name: string;
  kind: 'KILLER';
}

export interface Gen {
  id: string;
  progress: number; // repair measurement
  isRegressing: boolean; // wont use for initial version
  numHealers: number;
}

export interface GameState {
  status: GameStatus;
  survivors: Array<Survivor>;
  killer: Killer | undefined;
  generators: Array<Gen>;
}

export type GameElement = Survivor | Gen;
export type Player = Survivor | Killer;
