/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GameStackParamList} from '../navigators';
import {CreateRoomDialog, JoinRoomDialog} from '../components';
import shortid from 'shortid';
import {useGameChannel} from '../hooks';

export const CreateOrJoinScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'CreateOrJoin'>
> = ({navigation}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState<string | undefined>(shortid.generate());
  useGameChannel(id);
  const [showJoinAlert, setShowJoinAlert] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const onPressCreate = () => {
    setShowCreateRoom(true);
  };

  const onPressJoin = () => {
    setShowJoinAlert(true);
  };

  const onPressCreateSubmit = () => {
    setShowCreateRoom(false);
    navigation.navigate('Lobby', {didCreateRoom: true});
  };

  const onPressJoinSubmit = (joinId: string) => {
    setShowJoinAlert(false);
    setId(joinId);
    navigation.navigate('Lobby', {didCreateRoom: false});
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View
          style={{
            width: '100%',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TextInput
            onChangeText={typed => setName(typed)}
            placeholder="Enter your name"
            style={styles.input}
          />
        </View>
        <View style={{margin: 40, backgroundColor: '#841584', width: '50%'}}>
          <Button
            onPress={onPressCreate}
            disabled={!name}
            color="white"
            title="Create Game"
          />
        </View>
        <View style={{margin: 40, backgroundColor: '#841584', width: '50%'}}>
          <Button
            onPress={onPressJoin}
            disabled={!name}
            color="white"
            title="Join Game"
          />
        </View>
      </View>
      <CreateRoomDialog
        id={id || ''}
        onPress={onPressCreateSubmit}
        show={showCreateRoom}
      />
      <JoinRoomDialog
        onPress={onPressJoinSubmit}
        show={showJoinAlert}
        setShow={setShowJoinAlert}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: '30%',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
