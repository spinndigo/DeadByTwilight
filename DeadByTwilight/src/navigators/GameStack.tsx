import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateOrJoinScreen,
  GameScreen,
  LobbyScreen,
  PostGameScreen,
} from '../screens';
import {GameContext, GameDispatchContext} from '../GameContext';
import {gamestateReducer, initialState} from '../gamestateReducer';
import {GameChannelProvider} from '../hooks';

export type GameStackParamList = {
  CreateOrJoin: undefined;
  Lobby: {didCreateRoom: boolean; name: string};
  Game: undefined;
  PostGame: undefined;
};

const Stack = createNativeStackNavigator<GameStackParamList>();

export const GameStack = () => {
  const [game, dispatch] = React.useReducer(gamestateReducer, initialState);

  return (
    <GameChannelProvider>
      <GameContext.Provider value={game}>
        <GameDispatchContext.Provider value={dispatch}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="CreateOrJoin">
            <Stack.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
            <Stack.Screen
              name="Lobby"
              component={LobbyScreen}
              options={{orientation: 'landscape'}}
            />
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
    </GameChannelProvider>
  );
};
