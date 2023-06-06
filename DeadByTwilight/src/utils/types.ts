export type Health = 'HEALTHY' | 'INJURED' | 'DYING' | 'DEAD';

interface Survivor {
  id: string;
  name: string;
  health: Health;
}

interface Killer {
  id: string;
  name: string;
}

export interface Generator {
  id: string;
  progress: number;
  isRegressing: boolean;
}

export interface GameState {
  survivors: Array<Survivor>;
  killer: Killer;
  generators: Array<Generator>;
}
