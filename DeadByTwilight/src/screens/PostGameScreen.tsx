import React from 'react';
import {View} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const PostGameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'PostGame'>
> = ({}) => {
  return <View> {'placeholder for post game screen'} </View>;
};
