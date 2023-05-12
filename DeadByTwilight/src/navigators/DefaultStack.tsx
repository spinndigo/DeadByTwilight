import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TitleScreen, CreateOrJoinScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName="Title">
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
    </Stack.Navigator>
  );
};
