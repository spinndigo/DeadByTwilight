/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GameContext, GameDispatchContext} from '../GameContext';
import {StyleSheet, Text, View} from 'react-native';
import {GenItem, SurvivorItem} from '../components';

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
      <View style={{flexDirection: 'row', width: '90%'}}>
        <View style={{...styles.column, backgroundColor: 'lightblue'}}>
          {game.survivors.map(s => (
            <SurvivorItem survivor={s} onPress={() => undefined} />
          ))}
        </View>
        <View style={{...styles.column, backgroundColor: 'pink'}}>
          {game.generators.map(g => (
            <GenItem gen={g} onPress={() => undefined} />
          ))}
          {isSurvivor && (
            <View style={{justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                {`Gens remaining: ${
                  game.generators.filter(g => g.progress < 100).length
                }`}
              </Text>
            </View>
          )}
        </View>
      </View>
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
});
