import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreen, LoginScreen} from '../screens';
import {GameStack} from './GameStack';

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
  GameStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="GameStack" component={GameStack} />
    </Stack.Navigator>
  );
};
