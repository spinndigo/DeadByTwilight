/* eslint-disable react-native/no-inline-styles */
import * as Progress from 'react-native-progress';
import React, {useState} from 'react';
import {Button, TouchableHighlight, View} from 'react-native';
import {GameElement} from '../utils/types';
import {useProgression} from '../hooks/useProgression';
import {isSurvivor} from '../utils/helpers';
import {Text} from 'react-native';

interface Props {
  element: GameElement;
}

export const SurvivorActionBar: React.FC<Props> = ({element}) => {
  const [isHeld, setIsHeld] = useState(false);
  const title = isSurvivor(element) ? 'HEAL' : 'REPAIR';
  const elementLabel = isSurvivor(element) ? element.name : element.id;
  useProgression(element, isHeld);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        justifyContent: 'center',
      }}>
      <View style={{width: '100%'}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', margin: 20}}>
          {elementLabel}
        </Text>
        <Progress.Bar progress={element.progress * 0.01} />
      </View>
      <View style={{marginTop: 30, justifyContent: 'center'}}>
        <TouchableHighlight
          disabled={element.progress >= 100}
          onPressIn={() => setIsHeld(true)}
          onPressOut={() => setIsHeld(false)}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'purple',
              padding: 10,
            }}>
            {title}
          </Text>
        </TouchableHighlight>
        <Text style={{textAlign: 'center', marginTop: 20}}>
          {isHeld && `${title.toLowerCase()}ing...`}
        </Text>
      </View>
    </View>
  );
};
