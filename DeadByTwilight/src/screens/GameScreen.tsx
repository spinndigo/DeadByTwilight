/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Text, View} from 'react-native';
import {GenRow, SurvivorRow} from '../components';

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
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
          {game.survivors.map(s => (
            <SurvivorRow survivor={s} onPress={() => undefined} />
          ))}
        </View>
        <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
          {game.generators.map(g => (
            <GenRow gen={g} onPress={() => undefined} />
          ))}
        </View>
        {isSurvivor && (
          <View>
            <Text>
              {`Gens remaining: ${
                game.generators.filter(g => g.progress < 100).length
              }`}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
