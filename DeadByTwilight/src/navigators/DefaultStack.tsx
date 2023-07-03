import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TitleScreen} from '../screens';
import {GameStack} from './GameStack';

export type DefaultStackParamList = {
  Title: undefined;
  GameStack: undefined;
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName="Title">
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="GameStack" component={GameStack} />
    </Stack.Navigator>
  );
};
