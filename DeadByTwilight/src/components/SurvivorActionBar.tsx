/* eslint-disable react-native/no-inline-styles */
import * as Progress from 'react-native-progress';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GameElement} from '../utils/types';
import {useProgression} from '../hooks';
import {isSurvivor} from '../utils/helpers';
import {Text} from 'react-native';
import {ColumnWrapper, RowWrapper} from './elements';
import {SkillCheck} from './SkillCheck';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';

interface Props {
  element: GameElement;
}

type CheckResult = 'Miss' | 'Good' | 'Great';

export const SurvivorActionBar: React.FC<Props> = ({element}) => {
  const {gameChannel} = useGameChannel();
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [lastCheck, setLastCheck] = useState<CheckResult | ''>('');

  const elIsSurvivor = isSurvivor(element);
  const title = elIsSurvivor ? 'HEAL' : 'REPAIR';
  const elementLabel = elIsSurvivor ? element.name : element.id;
  const action = elIsSurvivor
    ? Action.UPDATE_SURVIVOR_PROGRESS
    : Action.UPDATE_GEN_PROGRESS;
  const progress = elIsSurvivor
    ? game?.survivors.find(s => s.id === element.id)?.progress
    : game?.generators.find(g => g.id === element.id)?.progress;

  const applySkillDelta = async (result: CheckResult) => {
    if (result === 'Good') return;
    const skillCheckDelta = result === 'Great' ? 2 : -15;
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: `client-${elIsSurvivor ? 'survivor' : 'gen'}-progressed`,
      data: JSON.stringify({
        id: element.id,
        delta: skillCheckDelta,
      }),
    });
    if (dispatch)
      dispatch({
        type: action,
        payload: {id: element.id, delta: skillCheckDelta},
      });
  };

  const onGreat = () => {
    setLastCheck('Great');
    applySkillDelta('Great');
  };

  const onMiss = () => {
    setLastCheck('Miss');
    applySkillDelta('Miss');
  };

  useProgression(element);

  useEffect(() => {
    const updateOngoingAction = async () => {
      await gameChannel?.trigger({
        channelName: gameChannel.channelName,
        eventName: `client-survivor-ongoing-updated`,
        data: JSON.stringify({
          subjectId: gameChannel?.me?.userId || '',
          targetId: element.id,
        }),
      });
      if (dispatch)
        dispatch({
          type: Action.UPDATE_SURVIVOR_ONGOING_ACTION,
          payload: {
            subjectId: gameChannel?.me?.userId || '',
            targetId: element.id,
          },
        });
    };
    updateOngoingAction();
  }, []);

  if (progress === undefined) return null;
  const isComplete = progress >= 100;

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
      {isComplete ? (
        <View>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
            {'Complete!'}
          </Text>
        </View>
      ) : (
        <>
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
            </RowWrapper>
            <RowWrapper>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Progress.Bar progress={progress * 0.01} />
              </View>
            </RowWrapper>

            <View style={{width: '100%'}}>
              <Text style={{textAlign: 'center'}}>
                {`${title.toLowerCase()}ing...`}
              </Text>
              {lastCheck && (
                <Text
                  style={{
                    textAlign: 'center',
                  }}>{`Last Skill Check: ${lastCheck}`}</Text>
              )}
            </View>
          </ColumnWrapper>
          <ColumnWrapper
            style={{
              width: '50%',
              alignContent: 'center',
            }}>
            <View>
              <SkillCheck
                onGood={() => setLastCheck('Good')}
                onGreat={onGreat}
                onMiss={onMiss}
              />
            </View>
          </ColumnWrapper>
        </>
      )}
    </View>
  );
};
