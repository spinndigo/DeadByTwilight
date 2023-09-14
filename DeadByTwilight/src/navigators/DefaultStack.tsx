import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TitleScreen} from '../screens';
import {GameStack} from './GameStack';
import {AuthStack} from './AuthStack';
import {useCurrentUser} from '../hooks';

export type DefaultStackParamList = {
  Title: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export const DefaultStack = () => {
  const {currentUser} = useCurrentUser();
  const AppStack = !!currentUser ? (
    <Stack.Screen name="App" component={GameStack} />
  ) : (
    <Stack.Screen name="App" component={AuthStack} />
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Title'}>
      <Stack.Screen name="Title" component={TitleScreen} />
      {AppStack}
    </Stack.Navigator>
  );
};
