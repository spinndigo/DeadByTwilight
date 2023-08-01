/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {StyleSheet, Text, View} from 'react-native';
import {
  ActionModal,
  GenItem,
  KillerActionButton,
  SurvivorActionBar,
  SurvivorItem,
} from '../components';
import {GameElement} from '../utils/types';
import {getGensRemaining} from '../utils/helpers';
import {GEN_BACKGROUND_COLOR, SURVIVOR_BACKGROUND_COLOR} from '../styles';
import {Action} from '../gamestateReducer';

export const GameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Game'>
> = ({navigation}) => {
  const {navigate} = navigation;
  const {gameChannel} = useGameChannel();
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const isKiller = game?.killer?.id === gameChannel?.me?.userId;
  const [selectedElement, setSelectedElement] = useState<
    GameElement | undefined
  >(undefined);

  if (!game) {
    throw new Error('No game state found');
  }

  useEffect(() => {
    if (game.status === 'FINISHED') {
      navigate('PostGame');
    }
  }, [game.status, navigate]);

  useEffect(() => {
    const updateOngoingAction = async () => {
      await gameChannel?.trigger({
        channelName: gameChannel.channelName,
        eventName: `client-survivor-ongoing-updated`,
        data: JSON.stringify({
          subjectId: gameChannel?.me?.userId || '',
          targetId: null,
        }),
      });
      if (dispatch)
        dispatch({
          type: Action.UPDATE_SURVIVOR_ONGOING_ACTION,
          payload: {
            subjectId: gameChannel?.me?.userId || '',
            targetId: null,
          },
        });
    };
    if (!isKiller) updateOngoingAction();
  }, []);

  if (!game || !gameChannel || !dispatch) {
    return <Text> {'Something went wrong'} </Text>;
  }

  const action = (selectedElement &&
    (isKiller ? (
      <KillerActionButton element={selectedElement} />
    ) : (
      <SurvivorActionBar element={selectedElement} />
    ))) || <></>;

  return (
    <>
      <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
        <View
          style={{
            ...styles.column,
            backgroundColor: SURVIVOR_BACKGROUND_COLOR,
            borderRightWidth: 2,
          }}>
          {/* <Text style={{alignSelf: 'center'}}> {'Survivors'} </Text> */}
          {game.survivors.map(s => (
            <View key={`id-${s.id}`} style={{...styles.survivorItems}}>
              <SurvivorItem
                survivor={s}
                onPress={() => setSelectedElement(s)}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            ...styles.row,
            backgroundColor: GEN_BACKGROUND_COLOR,
            borderLeftWidth: 2,
          }}>
          {!isKiller && (
            <View style={{justifyContent: 'center', width: '100%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {`Gens remaining: ${getGensRemaining(game.generators)}`}
              </Text>
            </View>
          )}
          {game.generators.map(g => (
            <View key={`id-${g.id}`} style={{...styles.genItems}}>
              <GenItem gen={g} onPress={() => setSelectedElement(g)} />
            </View>
          ))}
        </View>
      </View>
      <ActionModal
        visible={!!selectedElement}
        onPressX={() => setSelectedElement(undefined)}
        gameElement={selectedElement}
        action={action}
      />
    </>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '50%',
    justifyContent: 'flex-start',
    alignContent: 'center',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  genItems: {
    height: '25%',
    width: '25%',
    margin: 10,
  },
  survivorItems: {
    height: '25%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
