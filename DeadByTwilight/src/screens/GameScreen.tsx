import React, {useReducer} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Survivor, Killer} from '../components';
import {gamestateReducer} from '../gamestateReducer';
import {GameContext, GameDispatchContext} from '../GameContext';
import {GameState} from '../utils/types';

export const GameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Game'>
> = ({}) => {
  const initialGame: GameState = {
    survivors: [],
    killer: {id: 'killer', name: 'blah'},
    generators: [],
  }; // todo

  const [game, dispatch] = useReducer(gamestateReducer, initialGame);
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {true ? <Survivor /> : <Killer />}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
