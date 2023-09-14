import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreen, LoginScreen} from '../screens';

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
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
    </Stack.Navigator>
  );
};
