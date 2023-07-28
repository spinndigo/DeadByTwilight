/* eslint-disable react-native/no-inline-styles */
import {TouchableWithoutFeedback, View} from 'react-native';
import {Health, Survivor} from '../utils/types';
import UserAvatar from 'react-native-user-avatar';
import React from 'react';
import {SurvivorItemWrapper} from './elements';
import {Text} from 'react-native';

type HealthColors = {
  [key in Health]: string;
};

const healthColors: HealthColors = {
  HEALTHY: 'green',
  INJURED: '#ffcc00',
  DYING: 'red',
  DEAD: 'grey',
};

interface Props {
  survivor: Survivor;
  onPress(): void;
}

export const SurvivorItem: React.FC<Props> = ({survivor, onPress}) => (
  <>
    <TouchableWithoutFeedback onPress={onPress}>
      <SurvivorItemWrapper>
        <View>
          <UserAvatar
            size={100}
            name={survivor.name}
            bgColor={healthColors[survivor.health]}
          />
        </View>
      </SurvivorItemWrapper>
    </TouchableWithoutFeedback>
    <View style={{marginTop: 10}}>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        {survivor.health.toLocaleUpperCase()}
      </Text>
    </View>
  </>
);
