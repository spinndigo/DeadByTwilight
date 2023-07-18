import {
  addSurvivor,
  applyGenProgressDelta,
  applySurvivorHealthDelta,
  applySurvivorProgressDelta,
  isGensComplete,
} from './utils/helpers';
import {
  GameState,
  HealthChange,
  Killer,
  Survivor,
  GameStatus,
} from './utils/types';

export enum Action {
  ADD_SURVIVOR = 'ADD_SURVIVOR',
  REMOVE_SURVIVOR = 'REMOVE_SURVIVOR',
  ADD_KILLER = 'ADD_KILLER',
  REMOVE_KILLER = 'REMOVE_KILLER',
  SET_INITIAL_GENS = 'SET_INITIAL_GENS',
  UPDATE_GEN_PROGRESS = 'UPDATE_GEN_PROGRESS',
  UPDATE_SURVIVOR_HEALTH = 'UPDATE_SURVIVOR_HEALTH',
  UPDATE_SURVIVOR_PROGRESS = 'UPDATE_SURVIVOR_PROGRESS',
  UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS',
}

export type SetInitialGensPayload = {
  quantity: number;
};

type UpdateGameStatusAction = {
  type: Action.UPDATE_GAME_STATUS;
  payload: GameStatus;
};

type UpdateGenCountAction = {
  type: Action.SET_INITIAL_GENS;
  payload: SetInitialGensPayload;
};

export type UpdateProgressPayload = {
  id: string;
  delta: number;
};

type UpdateGenProgressAction = {
  type: Action.UPDATE_GEN_PROGRESS;
  payload: UpdateProgressPayload;
};

type UpdateSurvivorProgressAction = {
  type: Action.UPDATE_SURVIVOR_PROGRESS;
  payload: UpdateProgressPayload;
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
  | UpdateGameStatusAction
  | UpdateGenCountAction
  | UpdateGenProgressAction
  | UpdateSurvivorHealthAction
  | UpdateSurvivorProgressAction
  | AddSurvivor
  | RemoveSurvivor
  | AddKiller
  | RemoveKiller;

type GamestateReducer = (state: GameState, action: GameAction) => GameState;

export const gamestateReducer: GamestateReducer = (state, action) => {
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
        generators: Array.from(
          {length: action.payload.quantity + 3},
          (_, i) => {
            return {
              id: `gen-${i}`,
              progress: 0,
              isRegressing: false,
              numHealers: 0,
            };
          },
        ),
      };

    case Action.UPDATE_GEN_PROGRESS:
      const newGens = applyGenProgressDelta(state.generators, action.payload);
      return {
        ...state,
        generators: newGens,
        status: isGensComplete(newGens) ? 'FINISHED' : state.status,
      };

    case Action.UPDATE_SURVIVOR_HEALTH:
      const newSurivors = applySurvivorHealthDelta(
        state.survivors,
        action.payload,
      );
      return {
        ...state,
        survivors: newSurivors,
        status: newSurivors.some(s => s.health !== 'DEAD')
          ? state.status
          : 'FINISHED',
      };

    case Action.UPDATE_SURVIVOR_PROGRESS:
      return {
        ...state,
        survivors: applySurvivorProgressDelta(state.survivors, action.payload),
      };

    case Action.UPDATE_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      throw new Error();
  }
};
