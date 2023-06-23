export type Health = 'HEALTHY' | 'INJURED' | 'DYING' | 'DEAD';
export type HealthChange = 'HEALED' | 'HURT';
export type GameStatus = 'UNBEGUN' | 'ONGOING' | 'FINISHED';

export interface Survivor {
  id: string;
  name: string;
  health: Health;
  heal_progress: number;
}

export interface Killer {
  id: string;
  name: string;
}

export interface Gen {
  id: string;
  progress: number;
  isRegressing: boolean;
}

export interface GameState {
  status: GameStatus;
  survivors: Array<Survivor>;
  killer: Killer | undefined;
  generators: Array<Gen>;
}

export type GameElement = Survivor | Gen;
