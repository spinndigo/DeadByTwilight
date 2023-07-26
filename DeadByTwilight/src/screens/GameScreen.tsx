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
            <View key={`id-${s.id}`} style={{...styles.items}}>
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
            <View key={`id-${g.id}`} style={{...styles.items}}>
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
    height: '25%',
    width: '25%',
    margin: 10,
  },
});
