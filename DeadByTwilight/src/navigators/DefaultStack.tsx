import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TitleScreen, CreateOrJoinScreen, LobbyScreen} from '../screens';

export type DefaultStackParamList = {
  Title: undefined;
  CreateOrJoin: undefined;
  Lobby: {id: string; name: string};
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName="Title">
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
    </Stack.Navigator>
  );
};
