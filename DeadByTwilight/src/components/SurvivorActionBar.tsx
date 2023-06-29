/* eslint-disable react-native/no-inline-styles */
import * as Progress from 'react-native-progress';
import React, {useState} from 'react';
import {TouchableHighlight, View} from 'react-native';
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
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
      <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
        <View
          style={{
            width: '50%',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
            }}>
            {elementLabel}
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Progress.Bar progress={element.progress * 0.01} />
          </View>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center'}}>
              {isHeld && `${title.toLowerCase()}ing...`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '50%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableHighlight
            style={{width: '80%'}}
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
                padding: 20,
              }}>
              {title}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
