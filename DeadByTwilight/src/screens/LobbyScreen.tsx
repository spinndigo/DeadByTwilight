/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameChannel} from '../hooks';
import {GenCountSlider} from '../components';
import {GameContext, GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Lobby'>
> = ({navigation}) => {
  const game = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [ready, setReady] = useState(false);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [genCount, setGenCount] = useState(3);
  const {gameChannel} = useGameChannel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {navigate} = navigation; // todo

  if (!game) throw new Error('No game state found');

  const survivorDisabled = game.survivors.length >= 4 || hasSelectedRole;
  const killerDisabled = !!game.killer || hasSelectedRole;

  const onPressSurvivor = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-survivor_selected',
      data: {survivor: gameChannel.me},
    });
    if (dispatch)
      dispatch({
        type: Action.ADD_SURVIVOR,
        payload: {
          id: gameChannel?.me?.userId || '345',
          name: gameChannel?.me?.userInfo.name || 'Anon',
          health: 'HEALTHY',
        },
      });
    setHasSelectedRole(true);
  };

  const onPressKiller = async () => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer_selected',
      data: {killer: gameChannel.me},
    });
    if (dispatch)
      dispatch({
        type: Action.ADD_KILLER,
        payload: {
          id: gameChannel?.me?.userId || '345',
          name: gameChannel?.me?.userInfo.name || 'Anon_killer',
        },
      });
    setHasSelectedRole(true);
  };

  const gameReady =
    game.survivors.length >= 2 && game.survivors.length < 5 && !!game.killer;

  const onStartGame = () => {
    return null; // todo
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View>
          <Text> {`Game Id : ${gameChannel?.channelName}`} </Text>
        </View>
        <View
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Text style={{width: '100%', textAlign: 'center'}}>
            {' '}
            {'Choose your role: '}{' '}
          </Text>
          <View style={{flexDirection: 'row'}}>
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
          <View>
            <Text> {'Indicate readiness:'} </Text>
            <Button
              color={ready ? 'green' : 'red'}
              title={ready ? 'Ready :)' : 'Not Ready :('}
              onPress={() => setReady(r => !r)}
            />
          </View>
        </View>

        <Text> {`generator count: ${genCount} `} </Text>

        <GenCountSlider
          initialCount={genCount}
          onValueChange={v => setGenCount(v)}
        />

        <View>
          <View>
            <Text style={{textAlign: 'center'}}>
              {' '}
              {`Player count: (${gameChannel?.members.size}) -- todo`}
              {', '}
            </Text>
          </View>
          <Text>
            {' '}
            {`survivor count: ${game.survivors.length} -- killer: ${
              game.killer?.name || 'unclaimed'
            }`}{' '}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: '#841584',
            width: '50%',
          }}>
          <Button
            disabled={!gameReady}
            onPress={onStartGame}
            color="#fff"
            title="Start Game"
          />
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
    fontWeight: 'bold',
    fontSize: 40,
  },
});
