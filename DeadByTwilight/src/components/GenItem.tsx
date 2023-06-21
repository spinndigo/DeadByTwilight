/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Gen} from '../utils/types';
import React from 'react';

interface Props {
  gen: Gen;
  onPress(): void;
}

export const GenItem: React.FC<Props> = ({gen, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: gen.progress === 100 ? 'yellow' : 'grey',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '30%',
        height: '30%',
      }}>
      <View>
        <Text>{gen.id}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
