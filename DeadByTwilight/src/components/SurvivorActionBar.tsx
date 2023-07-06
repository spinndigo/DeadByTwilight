/* eslint-disable react-native/no-inline-styles */
import * as Progress from 'react-native-progress';
import React, {useState} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {GameElement} from '../utils/types';
import {useProgression} from '../hooks/useProgression';
import {isSurvivor} from '../utils/helpers';
import {Text} from 'react-native';
import {ColumnWrapper, RowWrapper} from './elements';
import {SkillCheck} from './SkillCheck';

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
        <ColumnWrapper
          style={{
            width: '50%',
            justifyContent: 'space-evenly',
          }}>
          <RowWrapper style={{justifyContent: 'center', gap: 10}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',

                textAlign: 'center',
              }}>
              {elementLabel}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Progress.Bar progress={element.progress * 0.01} />
            </View>
          </RowWrapper>
          <RowWrapper>
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
          </RowWrapper>

          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center'}}>
              {isHeld && `${title.toLowerCase()}ing...`}
            </Text>
          </View>
        </ColumnWrapper>
        <ColumnWrapper
          style={{
            width: '50%',
          }}>
          <SkillCheck
            onGood={() => console.log('good')}
            onGreat={() => console.log('great')}
            onMiss={() => console.log('miss')}
          />
        </ColumnWrapper>
      </View>
    </View>
  );
};
