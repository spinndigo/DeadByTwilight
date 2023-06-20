/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Gen} from '../utils/types';
import React from 'react';

interface Props {
  gen: Gen;
  onPress(): void;
}

export const GenRow: React.FC<Props> = ({gen, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={{flexDirection: 'row'}}>
      <View>
        <Text>{gen.id}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
