/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Health, Survivor} from '../utils/types';
import UserAvatar from 'react-native-user-avatar';
import React from 'react';

type HealthColors = {
  [key in Health]: string;
};

const healthColors: HealthColors = {
  HEALTHY: 'green',
  INJURED: 'yellow',
  DYING: 'red',
  DEAD: 'grey',
};

interface Props {
  survivor: Survivor;
  onPress(): void;
}

export const SurvivorItem: React.FC<Props> = ({survivor, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{flexDirection: 'row', justifyContent: 'center', width: '50%'}}>
      <View>
        <UserAvatar
          name={survivor.name}
          bgColor={healthColors[survivor.health]}
        />
      </View>
      <View style={{alignContent: 'center'}}>
        <Text style={{textAlign: 'center'}}> {survivor.name} </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
