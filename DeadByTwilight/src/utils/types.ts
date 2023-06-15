export type Health = 'HEALTHY' | 'INJURED' | 'DYING' | 'DEAD';
export type HealthChange = 'HEALED' | 'HURT';

export interface Survivor {
  id: string;
  name: string;
  health: Health;
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
  survivors: Array<Survivor>;
  killer: Killer | undefined;
  generators: Array<Gen>;
}
