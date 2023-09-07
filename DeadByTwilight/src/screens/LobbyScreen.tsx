/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCurrentUser, useGameChannel} from '../hooks';
import {GenCountSlider, PlayerCard} from '../components';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {global} from '../styles/global';
import {RowWrapper} from '../components/elements';
import {isGameReady} from '../utils/helpers';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Lobby'>
> = ({navigation, route}) => {
  const {didCreateRoom} = route.params;
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [selectedRole, setSelectedRole] = useState<Role>(undefined);
  const {gameChannel} = useGameChannel();
  const {currentUser} = useCurrentUser();
  const name = currentUser?.displayName;

  const {navigate} = navigation;

  if (!game) throw new Error('No game state found');

  const survivorDisabled = game.survivors.length >= 4 || selectedRole;
  const killerDisabled = !!game.killer || selectedRole;

  const onPressSurvivor = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-survivor-selected',
      data: JSON.stringify({
        id: gameChannel?.me?.userId || '1408',
        name: name || 'Wendy',
        health: 'HEALTHY',
        ongoingAction: null,
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
          ongoingAction: null,
          progress: 0,
          numHealers: 0,
          kind: 'SURVIVOR',
        },
      });
    setSelectedRole('SURVIVOR');
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
    setSelectedRole('KILLER');
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

  const gameReady = __DEV__ ? true : isGameReady(game);

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
            {!selectedRole ? (
              <>
                <Button
                  color={
                    survivorDisabled
                      ? 'grey'
                      : styles.survivorButton.backgroundColor
                  }
                  disabled={!!survivorDisabled}
                  onPress={onPressSurvivor}
                  title="Survivor"
                />
                <Button
                  color={
                    killerDisabled
                      ? 'grey'
                      : styles.killerButton.backgroundColor
                  }
                  disabled={!!killerDisabled}
                  onPress={onPressKiller}
                  title="Killer"
                />
              </>
            ) : (
              <Text style={{...styles.text, marginTop: 10}}>
                {`You have selected ${selectedRole} `}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{width: '50%', alignContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', ...styles.text}}>
            {`Generator count: ${game.generators.length || 6}`}
          </Text>
          <Text style={{...styles.text}}>{`Needed to win: ${
            (game.generators.length || 6) - 2
          }`}</Text>
          {didCreateRoom && (
            <GenCountSlider
              initialCount={3}
              onValueChange={v => onAdjustGenSlider(v)}
            />
          )}
        </View>
      </RowWrapper>
      <RowWrapper>
        <Text
          style={{
            ...styles.text,
          }}>{`Number of players in lobby: ${gameChannel?.members.size}`}</Text>
      </RowWrapper>
      <RowWrapper style={{justifyContent: 'center', width: '90%'}}>
        <View style={{...styles.playerRow}}>
          <Text style={{...styles.text}}>{'Survivors: '}</Text>
          {game.survivors.map(s => (
            <PlayerCard
              key={`${s.id}-${s.name}`}
              name={s.name}
              isMe={name === s.name}
              role="survivor"
            />
          ))}
        </View>
        <View style={{...styles.playerRow, width: '20%'}}>
          <Text style={{...styles.text}}>{'Killer: '}</Text>
          {game.killer && (
            <PlayerCard
              key={`${game.killer.id}-${game.killer.name}`}
              name={game.killer?.name}
              isMe={name === game.killer.name}
              role="killer"
            />
          )}
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
              disabled={!gameReady}
              onPress={onStartGame}
              color="#fff"
              title="Start Game"
            />
          </View>
        ) : (
          <Text style={{...styles.text}}>
            {'Waiting for lobby creator to start game...'}
          </Text>
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
  playerRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '80%',
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    gap: 10,
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
