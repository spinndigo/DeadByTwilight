import {createContext} from 'react';
import {GameState} from './utils/types';
import {GameAction} from './gamestateReducer';

export const GameContext = createContext<GameState | null>(null);
export const GameDispatchContext =
  createContext<React.Dispatch<GameAction> | null>(null);
