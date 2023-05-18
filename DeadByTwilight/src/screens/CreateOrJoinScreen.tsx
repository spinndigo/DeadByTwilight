/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {Button} from '../components';
import shortid from 'shortid';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DefaultStackParamList} from '../navigators';

export const CreateOrJoinScreen: React.FC<
  NativeStackScreenProps<DefaultStackParamList, 'CreateOrJoin'>
> = ({navigation}) => {
  const [name, setName] = useState('');

  const createLobbyAlert = (id: string) =>
    Alert.alert('Share the below room id with your friends:', id, [
      {
        text: 'OK',
        onPress: () => navigation.navigate({name: 'Lobby', params: {id, name}}),
      },
    ]);

  const onPressCreate = () => {
    const newRoomId = shortid.generate();
    createLobbyAlert(newRoomId);
  };

  return (
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
        <Button disabled={!name} color="white" title="Join Game" />
      </View>
    </View>
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
