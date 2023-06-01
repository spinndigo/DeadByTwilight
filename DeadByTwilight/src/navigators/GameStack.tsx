import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GameScreen, PostGameScreen} from '../screens';

export type GameStackParamList = {
  Game: undefined;
  PostGame: undefined;
};

const Stack = createNativeStackNavigator<GameStackParamList>();

export const GameStack = () => {
  return (
    <Stack.Navigator initialRouteName="Game">
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
  );
};
