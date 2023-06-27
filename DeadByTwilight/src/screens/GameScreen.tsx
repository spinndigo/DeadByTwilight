/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
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

  const action = (selectedElement &&
    (isKiller ? (
      <KillerActionButton element={selectedElement} />
    ) : (
      <SurvivorActionBar element={selectedElement} />
    ))) || <></>;

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
        visible={!!selectedElement}
        onDismiss={() => setSelectedElement(undefined)}
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
    height: '30%',
    width: '30%',
    margin: 10,
  },
});
