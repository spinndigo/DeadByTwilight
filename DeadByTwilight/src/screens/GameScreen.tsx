/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Survivor, Killer} from '../components';
import {useGameChannel} from '../hooks';

export const GameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Game'>
> = ({}) => {
  const {gameChannel} = useGameChannel();
  return true ? <Survivor /> : <Killer />;
};
