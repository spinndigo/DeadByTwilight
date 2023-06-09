import {
  applyGenDelta,
  applyGenRegression,
  applySurvivorHealthDelta,
} from './utils/helpers';
import {GameState, HealthChange, Killer, Survivor} from './utils/types';

enum Action {
  ADD_SURVIVORS = 'ADD_SURVIVORS',
  REMOVE_SURVIVOR = 'REMOVE_SURVIVOR',
  ADD_KILLER = 'ADD_KILLER',
  REMOVE_KILLER = 'REMOVE_KILLER',
  UPDATE_PROGRESS = 'UPDATE_PROGRESS',
  UPDATE_GEN_REGRESSION = 'UPDATE_GEN_REGRESSION',
  UPDATE_SURVIVOR_HEALTH = 'UPDATE_SURVIVOR_HEALTH',
}

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

type AddSurvivors = {
  type: Action.ADD_SURVIVORS;
  payload: Array<Survivor>;
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
  | UpdateProgressAction
  | UpdateSurvivorHealthAction
  | UpdateGenRegression
  | AddSurvivors
  | RemoveSurvivor
  | AddKiller
  | RemoveKiller;

type GamestateReducer = (state: GameState, action: GameAction) => GameState;

export const gamestateReducer: GamestateReducer = (state, action) => {
  switch (action.type) {
    case Action.ADD_SURVIVORS:
      return {
        ...state,
        survivors: [...state.survivors, ...action.payload],
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