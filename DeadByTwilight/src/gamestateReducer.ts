import {applyGenDelta} from './utils/helpers';
import {GameState, Health} from './utils/types';

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

type UpdateHealthPayload = {
  survivor_id: string;
  health: Health;
};

type UpdateSurvivorHealthAction = {
  type: Action.UPDATE_SURVIVOR_HEALTH;
  payload: UpdateHealthPayload;
};

type GameAction = UpdateProgressAction | UpdateSurvivorHealthAction;

type GamestateReducer = (state: GameState, action: GameAction) => GameState;

export const gamestateReducer: GamestateReducer = (state, action) => {
  switch (action.type) {
    case Action.UPDATE_PROGRESS:
      return {
        ...state,
        generators: applyGenDelta(state.generators, action.payload),
      };

    default:
      throw new Error();
  }
};
