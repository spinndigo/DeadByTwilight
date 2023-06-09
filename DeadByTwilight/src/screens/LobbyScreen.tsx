import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {GameStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {usePresenceChannel} from '../hooks';
import {PusherMember} from '@pusher/pusher-websocket-react-native';
import {GenCountSlider} from '../components';

export type Role = 'SURVIVOR' | 'KILLER' | undefined;

export const LobbyScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'Lobby'>
> = ({navigation, route}) => {
  const [survivors, setSurvivors] = useState<Array<PusherMember>>([]);
  const [killer, setKiller] = useState<PusherMember | undefined>(undefined);
  const [role, setRole] = useState<Role>(undefined);
  const [ready, setReady] = useState(false);
  const [genCount, setGenCount] = useState(3);
  const {id} = route.params;
  const {channelMembers, playerCount, me} = usePresenceChannel(id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {navigate} = navigation; // todo

  const survivorDisabled = survivors.length >= 4 || !!role;
  const killerDisabled = !!killer || !!role;

  const onPressSurvivor = () => {
    if (survivors.length <= 4 && me && !role) {
      setSurvivors(prev => {
        const newSurvivors = prev.slice();
        newSurvivors.push(me);
        return newSurvivors;
      });
      setRole('SURVIVOR');
    }
  };

  const onPressKiller = () => {
    if (!killer && me && !role) {
      setKiller(me);
      setRole('KILLER');
    }
  };

  const gameReady = survivors.length >= 2 && survivors.length < 5 && !!killer;

  const onStartGame = () => {
    return null; // todo
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View>
          <Text> {`Game Id : ${id}`} </Text>
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
              {`Player count: (${playerCount}) -- ${channelMembers.map(
                m => m.userInfo?.name,
              )}`}
              {', '}
            </Text>
          </View>
          <Text>
            {' '}
            {`survivor count: ${survivors.length} -- killer: ${
              killer?.userInfo.name || 'unclaimed'
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
