/* eslint-disable react-native/no-inline-styles */
import {TouchableWithoutFeedback, View} from 'react-native';
import {Health, Survivor} from '../utils/types';
import UserAvatar from 'react-native-user-avatar';
import React, {useContext} from 'react';
import {SurvivorItemWrapper} from './elements';
import {Text} from 'react-native';
import {GameContext} from '../GameContext';
import {isSurvivor} from '../utils/helpers';
import * as Progress from 'react-native-progress';

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

export const SurvivorItem: React.FC<Props> = ({survivor, onPress}) => {
  const game = useContext(GameContext);
  const ongoingElement = survivor.ongoingAction
    ? game?.survivors.find(s => s.id === survivor.ongoingAction?.id) ||
      game?.generators.find(g => g.id === survivor.ongoingAction?.id)
    : undefined;
  const ongoingLabel = ongoingElement
    ? isSurvivor(ongoingElement)
      ? 'S'
      : 'G'
    : '';
  const ongoingProgress = ongoingElement ? ongoingElement.progress : null;
  return (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <View style={{width: '33%'}}>
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
      </View>
      <View style={{width: '33%'}}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          {survivor.health.toLocaleUpperCase()}
        </Text>
      </View>
      <View style={{width: '33%'}}>
        {ongoingElement && (
          <>
            <Text>{ongoingLabel}</Text>
            <Progress.Bar
              progress={ongoingProgress ? ongoingProgress * 0.01 : 0}
            />
          </>
        )}
      </View>
    </View>
  );
};
