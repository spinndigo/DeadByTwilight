import {
  addSurvivor,
  applyGenDelta,
  applyGenRegression,
  applySurvivorHealthDelta,
} from './utils/helpers';
import {GameState, HealthChange, Killer, Survivor} from './utils/types';

export enum Action {
  ADD_SURVIVOR = 'ADD_SURVIVOR',
  REMOVE_SURVIVOR = 'REMOVE_SURVIVOR',
  ADD_KILLER = 'ADD_KILLER',
  REMOVE_KILLER = 'REMOVE_KILLER',
  SET_INITIAL_GENS = 'SET_INITIAL_GENS',
  UPDATE_PROGRESS = 'UPDATE_PROGRESS',
  UPDATE_GEN_REGRESSION = 'UPDATE_GEN_REGRESSION',
  UPDATE_SURVIVOR_HEALTH = 'UPDATE_SURVIVOR_HEALTH',
}

export type SetInitialGensPayload = {
  quantity: number;
};

type UpdateGenCountAction = {
  type: Action.SET_INITIAL_GENS;
  payload: SetInitialGensPayload;
};

export type UpdateProgressPayload = {
  gen_id: string;
  delta: number;
};

type UpdateProgressAction = {
  type: Action.UPDATE_PROGRESS;
  payload: UpdateProgressPayload;
};

export type UpdateGenRegressionPayload = {
  id: string;
  isRegressing: boolean;
};

type UpdateGenRegression = {
  type: Action.UPDATE_GEN_REGRESSION;
  payload: UpdateGenRegressionPayload;
};

export type UpdateHealthPayload = {
  survivor_id: string;
  healthChange: HealthChange;
};

type UpdateSurvivorHealthAction = {
  type: Action.UPDATE_SURVIVOR_HEALTH;
  payload: UpdateHealthPayload;
};

type AddSurvivor = {
  type: Action.ADD_SURVIVOR;
  payload: Survivor;
};

type RemoveSurvivorPayload = {id: string};

type RemoveSurvivor = {
  type: Action.REMOVE_SURVIVOR;
  payload: RemoveSurvivorPayload;
};

type AddKiller = {
  type: Action.ADD_KILLER;
  payload: Killer;
};

type RemovekillerPayload = RemoveSurvivorPayload;

type RemoveKiller = {
  type: Action.REMOVE_KILLER;
  payload: RemovekillerPayload;
};

export type GameAction =
  | UpdateGenCountAction
  | UpdateProgressAction
  | UpdateSurvivorHealthAction
  | UpdateGenRegression
  | AddSurvivor
  | RemoveSurvivor
  | AddKiller
  | RemoveKiller;

type GamestateReducer = (state: GameState, action: GameAction) => GameState;

export const gamestateReducer: GamestateReducer = (state, action) => {
  console.log('running reducer..');
  switch (action.type) {
    case Action.ADD_SURVIVOR:
      return {
        ...state,
        survivors: addSurvivor(state.survivors, action.payload),
      };

    case Action.REMOVE_SURVIVOR:
      return {
        ...state,
        survivors: state.survivors
          .slice()
          .filter(s => s.id !== action.payload.id),
      };

    case Action.ADD_KILLER:
      return {
        ...state,
        killer: action.payload,
      };

    case Action.REMOVE_KILLER:
      return {
        ...state,
        killer: undefined,
      };

    case Action.SET_INITIAL_GENS:
      return {
        ...state,
        generators: Array.from({length: action.payload.quantity}, (_, i) => {
          return {id: `gen-${i}`, progress: 0, isRegressing: false};
        }),
      };

    case Action.UPDATE_PROGRESS:
      return {
        ...state,
        generators: applyGenDelta(state.generators, action.payload),
      };

    case Action.UPDATE_GEN_REGRESSION:
      return {
        ...state,
        generators: applyGenRegression(state.generators, action.payload),
      };

    case Action.UPDATE_SURVIVOR_HEALTH:
      return {
        ...state,
        survivors: applySurvivorHealthDelta(state.survivors, action.payload),
      };

    default:
      throw new Error();
  }
};
