/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GenCountSlider, PlayerCard} from '../components';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {global} from '../styles/global';
import {RowWrapper} from '../components/elements';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Lobby'>
> = ({navigation, route}) => {
  const {didCreateRoom, name} = route.params;
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const {gameChannel} = useGameChannel();
  const members = gameChannel?.members ? Array.from(gameChannel?.members) : [];

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
    <View style={{...styles.wrapper, ...global.screenWrapper}}>
      <RowWrapper style={{gap: 5, marginTop: 5}}>
        <Text style={{fontSize: 20, ...styles.text}}>{`Game Id: `}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, ...styles.text}}>
          {gameChannel?.channelName.slice(9)}
        </Text>
      </RowWrapper>
      <RowWrapper style={{marginTop: 30}}>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '50%',
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
        <View
          style={{width: '50%', alignContent: 'center', alignItems: 'center'}}>
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
      </RowWrapper>
      <RowWrapper>
        <Text>{`Number of players in lobby: ${gameChannel?.members.size}`}</Text>
      </RowWrapper>
      <RowWrapper style={{justifyContent: 'center', width: '90%'}}>
        <View style={{...styles.playerColumn}}>
          <Text>{'Survivors: '}</Text>
          {game.survivors.map(s => (
            <PlayerCard name={s.name} role="survivor" />
          ))}
        </View>
        <View style={{...styles.playerColumn}}>
          <Text>{'Killer: '}</Text>
          {game.killer && <PlayerCard name={game.killer?.name} role="killer" />}
        </View>
      </RowWrapper>

      <RowWrapper>
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
      </RowWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 40,
  },
  playerColumn: {
    width: '50%',
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
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
