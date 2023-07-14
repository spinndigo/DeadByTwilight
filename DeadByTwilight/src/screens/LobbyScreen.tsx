/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GenCountSlider} from '../components';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {global} from '../styles/global';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Lobby'>
> = ({navigation, route}) => {
  const {didCreateRoom, name} = route.params;
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const {gameChannel} = useGameChannel();

  const {navigate} = navigation;

  console.log('game state: ', game);

  if (!game) throw new Error('No game state found');

  const survivorDisabled = game.survivors.length >= 4 || hasSelectedRole;
  const killerDisabled = !!game.killer || hasSelectedRole;

  const onPressSurvivor = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-survivor-selected',
      data: JSON.stringify({
        id: gameChannel?.me?.userId || '1408',
        name: name || 'Wendy',
        health: 'HEALTHY',
        progress: 0,
        numHealers: 0,
      }),
    });
    if (dispatch)
      dispatch({
        type: Action.ADD_SURVIVOR,
        payload: {
          id: gameChannel?.me?.userId || '1408',
          name: name || 'Wendy',
          health: 'HEALTHY',
          progress: 0,
          numHealers: 0,
          kind: 'SURVIVOR',
        },
      });
    setHasSelectedRole(true);
  };

  const onPressKiller = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer-selected',
      data: JSON.stringify({
        id: gameChannel?.me?.userId || '237',
        name: name || 'Jack',
      }),
    });
    if (dispatch)
      dispatch({
        type: Action.ADD_KILLER,
        payload: {
          id: gameChannel?.me?.userId || '237',
          name: name || 'Jack',
          kind: 'KILLER',
        },
      });
    setHasSelectedRole(true);
  };

  const onAdjustGenSlider = async (quantity: number) => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-set-initial-gens',
      data: JSON.stringify({quantity}),
    });
    if (dispatch)
      dispatch({
        type: Action.SET_INITIAL_GENS,
        payload: {
          quantity,
        },
      });
  };

  const gameReady =
    game.survivors.length >= 2 &&
    game.survivors.length < 5 &&
    game.generators.length > game.survivors.length &&
    !!game.killer;

  const onStartGame = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-update-game-status',
      data: 'ONGOING',
    });
    if (dispatch)
      dispatch({
        type: Action.UPDATE_GAME_STATUS,
        payload: 'ONGOING',
      });
  };

  useEffect(() => {
    if (game.status === 'ONGOING') {
      navigate('Game');
    }
  }, [game.status, navigate]);

  return (
    <SafeAreaView>
      <View style={{...styles.wrapper, ...global.screenWrapper}}>
        <View>
          <Text style={{fontSize: 16, ...styles.text}}>{'Game Id : \n\n'}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20, ...styles.text}}>
            {gameChannel?.channelName.slice(9)}
          </Text>
        </View>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              width: '100%',
              fontWeight: 'bold',
              fontSize: 20,
              ...styles.text,
            }}>
            {'Choose your role: '}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              color={
                survivorDisabled
                  ? 'grey'
                  : styles.survivorButton.backgroundColor
              }
              disabled={survivorDisabled}
              onPress={onPressSurvivor}
              title="Survivor"
            />
            <Button
              color={
                killerDisabled ? 'grey' : styles.killerButton.backgroundColor
              }
              disabled={killerDisabled}
              onPress={onPressKiller}
              title="Killer"
            />
          </View>
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', ...styles.text}}>
            {`Generator count: ${game.generators.length}\n `}
          </Text>
          {didCreateRoom && (
            <GenCountSlider
              initialCount={game.generators.length}
              onValueChange={v => onAdjustGenSlider(v)}
            />
          )}
        </View>

        <View style={{gap: 20}}>
          <View>
            <Text style={{...styles.text}}>
              {' '}
              {`Player Count: ${gameChannel?.members.size}`}
            </Text>
          </View>
          <View>
            <Text style={{...styles.text}}>
              {' '}
              {`survivors(${game.survivors.length}): ${game.survivors.map(
                s => `${s.name}, `,
              )}`}
            </Text>
          </View>
          <View>
            <Text style={{...styles.text}}>{`killer: ${
              game.killer?.name || 'n/a'
            }`}</Text>
          </View>
        </View>
        <View>
          {didCreateRoom ? (
            <View
              style={{
                justifyContent: 'flex-end',
                backgroundColor: '#841584',
                width: 200,
              }}>
              <Button
                disabled={!gameReady && false}
                onPress={onStartGame}
                color="#fff"
                title="Start Game"
              />
            </View>
          ) : (
            <Text> {'Waiting for lobby creator to start game...'} </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'flex-end',
  },
  survivorButton: {
    backgroundColor: 'blue',
  },
  killerButton: {
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
});
