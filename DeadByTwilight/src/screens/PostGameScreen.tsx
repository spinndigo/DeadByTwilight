/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GameContext} from '../GameContext';
import {isSurvivorsWinner} from '../utils/helpers';

export const PostGameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'PostGame'>
> = ({navigation}) => {
  const {navigate} = navigation;
  const game = useContext(GameContext);
  if (!game) {
    throw new Error('game state not found');
  }
  const isSurvivorVictory = isSurvivorsWinner(game);
  const winnerMessage = isSurvivorVictory ? 'Survivors Won!' : 'Killer Won!';
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
        {winnerMessage}
      </Text>
      <Text>
        {isSurvivorVictory
          ? `The following survivors escaped: ${game.survivors
              .filter(s => s.health !== 'DEAD')
              .map(s => `${s.name}, `)}`
          : `${game.killer?.name} has sacrificed all survivors to the entity`}
      </Text>
      <Text>{'Click below to return to the title screen'}</Text>
      <TouchableWithoutFeedback onPress={() => navigate('CreateOrJoin')}>
        <Text> {'Exit Game'} </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
