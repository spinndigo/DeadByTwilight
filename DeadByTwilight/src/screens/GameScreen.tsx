/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {StyleSheet, Text, View} from 'react-native';
import {
  ActionModal,
  ElementInteraction,
  GenItem,
  SurvivorItem,
} from '../components';
import {GameElement} from '../utils/types';
import {isSurvivor} from '../utils/helpers';
import {Action} from '../gamestateReducer';
import {GEN_KICK_DAMAGE} from '../utils/constants';

type ActionHandler = (id: string) => void;

export const GameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Game'>
> = ({}) => {
  const {gameChannel} = useGameChannel();
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const isKiller = game?.killer?.id === gameChannel?.me?.userId;
  const [selectedElement, setSelectedElement] = useState<
    GameElement | undefined
  >(undefined);

  if (!game || !gameChannel || !dispatch) {
    return <Text> {'Something went wrong'} </Text>;
  }

  const isSurvivorAction = isSurvivor(selectedElement);

  const hitHandler: ActionHandler = async id => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer-hit',
      data: id,
    });
    dispatch({
      type: Action.UPDATE_SURVIVOR_HEALTH,
      payload: {survivor_id: id, healthChange: 'HURT'},
    });
  };

  const kickHandler: ActionHandler = async id => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer-kick',
      data: id,
    });
    dispatch({
      type: Action.UPDATE_PROGRESS,
      payload: {gen_id: id, delta: GEN_KICK_DAMAGE},
    });
  };

  const healHandler: ActionHandler = _id => undefined; // todo
  const repairHandler: ActionHandler = _id => undefined; // todo

  const playerAction: ElementInteraction =
    isKiller && isSurvivorAction
      ? {label: 'Hit', onPress: () => hitHandler(selectedElement.id)}
      : isKiller && !isSurvivorAction
      ? {label: 'Kick', onPress: () => kickHandler(selectedElement?.id || '')}
      : !isKiller && isSurvivorAction
      ? {label: 'Heal', onPress: () => healHandler(selectedElement.id)}
      : {
          label: 'Repair',
          onPress: () => repairHandler(selectedElement?.id || ''),
        };

  return (
    <>
      <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
        <View style={{...styles.column, backgroundColor: 'lightblue'}}>
          {game.survivors.map(s => (
            <View style={{...styles.items}}>
              <SurvivorItem
                survivor={s}
                onPress={() => setSelectedElement(s)}
              />
            </View>
          ))}
        </View>
        <View style={{...styles.row, backgroundColor: 'pink'}}>
          {!isKiller && (
            <View style={{justifyContent: 'center', width: '100%'}}>
              <Text style={{textAlign: 'center'}}>
                {`Gens remaining: ${
                  game.generators.filter(g => g.progress < 100).length
                }`}
              </Text>
            </View>
          )}
          {game.generators.map(g => (
            <View style={{...styles.items}}>
              <GenItem gen={g} onPress={() => setSelectedElement(g)} />
            </View>
          ))}
        </View>
      </View>
      <ActionModal
        interaction={playerAction}
        visible={!!selectedElement}
        gameElement={selectedElement}
      />
    </>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  items: {
    height: '30%',
    width: '30%',
    margin: 10,
  },
});
