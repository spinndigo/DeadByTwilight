/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GameContext, GameDispatchContext} from '../GameContext';
import {isSurvivorsWinner} from '../utils/helpers';
import {global} from '../styles';
import {useGameChannel} from '../hooks';
import {Action} from '../gamestateReducer';

export const PostGameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'PostGame'>
> = ({navigation}) => {
  const {navigate} = navigation;
  const game = useContext(GameContext);
  const {gameChannel} = useGameChannel();
  const dispatch = useContext(GameDispatchContext);
  if (!game) {
    throw new Error('game state not found');
  }
  const isSurvivorVictory = isSurvivorsWinner(game);
  const winnerMessage = isSurvivorVictory ? 'Survivors Won!' : 'Killer Won!';

  const onExit = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-reset-game',
      data: null,
    });
    if (dispatch)
      dispatch({
        type: Action.RESET_GAME,
      });

    await gameChannel?.unsubscribe();
    navigate('CreateOrJoin');
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        ...global.screenWrapper,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {winnerMessage}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {isSurvivorVictory
          ? `The following survivors escaped: ${game.survivors
              .filter(s => s.health !== 'DEAD')
              .map(s => `${s.name}, `)}`
          : `${game.killer?.name} has sacrificed all survivors to the entity`}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {'Click below to return to the title screen'}
      </Text>
      <TouchableWithoutFeedback onPress={onExit}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {' '}
          {'Exit Game'}{' '}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
