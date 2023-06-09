import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GameScreen, LobbyScreen, PostGameScreen} from '../screens';
import {GameContext, GameDispatchContext} from '../GameContext';
import {gamestateReducer} from '../gamestateReducer';
import {GameState} from '../utils/types';

export type GameStackParamList = {
  Lobby: {id: string; name: string};
  Game: undefined;
  PostGame: undefined;
};

const Stack = createNativeStackNavigator<GameStackParamList>();

export const GameStack = () => {
  const initialGame: GameState = {
    survivors: [],
    killer: {id: 'killer', name: 'blah'},
    generators: [],
  }; // todo

  const [game, dispatch] = React.useReducer(gamestateReducer, initialGame);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        <Stack.Navigator initialRouteName="Lobby">
          <Stack.Screen name="Lobby" component={LobbyScreen} />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="PostGame"
            component={PostGameScreen}
            options={{orientation: 'landscape'}}
          />
        </Stack.Navigator>
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
