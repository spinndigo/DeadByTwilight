import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../components';

export const TitleScreen: React.FC<{}> = () => (
  <View>
    <Text>Welcome to Dead by Twilight</Text>
    <Button title={'Get Started'} />
  </View>
);
