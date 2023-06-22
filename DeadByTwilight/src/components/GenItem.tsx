/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Gen} from '../utils/types';
import React from 'react';
import {GameItemWrapper} from './elements';

interface Props {
  gen: Gen;
  onPress(): void;
}

export const GenItem: React.FC<Props> = ({gen, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <GameItemWrapper
      style={{
        backgroundColor: gen.progress === 100 ? 'yellow' : 'grey',
      }}>
      <View>
        <Text>{gen.id}</Text>
      </View>
    </GameItemWrapper>
  </TouchableWithoutFeedback>
);
