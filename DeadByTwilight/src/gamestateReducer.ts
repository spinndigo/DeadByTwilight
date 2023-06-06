import {applyGenDelta, applySurvivorHealthDelta} from './utils/helpers';
import {GameState, HealthChange} from './utils/types';

enum Action {
  UPDATE_PROGRESS = 'UPDATE_PROGRESS',
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

export type UpdateHealthPayload = {
  survivor_id: string;
  healthChange: HealthChange;
};

type UpdateSurvivorHealthAction = {
  type: Action.UPDATE_SURVIVOR_HEALTH;
  payload: UpdateHealthPayload;
};

export type GameAction = UpdateProgressAction | UpdateSurvivorHealthAction;

type GamestateReducer = (state: GameState, action: GameAction) => GameState;

export const gamestateReducer: GamestateReducer = (state, action) => {
  switch (action.type) {
    case Action.UPDATE_PROGRESS:
      return {
        ...state,
        generators: applyGenDelta(state.generators, action.payload),
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
