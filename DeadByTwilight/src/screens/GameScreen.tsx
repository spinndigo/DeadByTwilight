import React, {useContext} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Survivor, Killer} from '../components';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Text} from 'react-native';

export const GameScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Game'>
> = ({}) => {
  const {gameChannel} = useGameChannel();
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const isSurvivor = game?.survivors.some(
    s => s.id === gameChannel?.me?.userId,
  );
  if (!game || !gameChannel || !dispatch) {
    return <Text> {'Something went wrong'} </Text>;
  }
  return isSurvivor ? (
    <Survivor dispatch={dispatch} channel={gameChannel} game={game} />
  ) : (
    <Killer dispatch={dispatch} channel={gameChannel} game={game} />
  );
};
