/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GameStackParamList} from '../navigators';
import {CreateRoomDialog, JoinRoomDialog} from '../components';
import shortid from 'shortid';
import {useCurrentUser, useGameChannel} from '../hooks';
import {global} from '../styles/global';
import {ColumnWrapper} from '../components/elements';
import {auth} from '../firebase/config';

export const CreateOrJoinScreen: React.FC<
  NativeStackScreenProps<GameStackParamList, 'CreateOrJoin'>
> = ({navigation}) => {
  const [id, setId] = useState<string | undefined>(
    shortid.generate().replace('I', 'i').replace('l', 'L'),
  );
  const [name, setName] = useState('');
  const {currentUser} = useCurrentUser();
  useGameChannel(id);
  const [showJoinAlert, setShowJoinAlert] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  // if(!currentUser) navigation.navigate('')

  const onPressCreate = () => {
    setId(shortid.generate());
    setShowCreateRoom(true);
  };

  const onPressJoin = () => {
    setShowJoinAlert(true);
  };

  const onPressCreateSubmit = () => {
    setShowCreateRoom(false);
    navigation.navigate('Lobby', {didCreateRoom: true, name});
  };

  const onPressJoinSubmit = (joinId: string) => {
    setShowJoinAlert(false);
    setId(joinId);
    navigation.navigate('Lobby', {didCreateRoom: false, name});
  };

  return (
    <>
      <View style={{...styles.wrapper, ...global.screenWrapper}}>
        <View style={{top: 100}}>
          <Text style={{...styles.text, textAlign: 'center', color: 'white'}}>
            {'Welcome back, '}
          </Text>
          <Text style={{...styles.text, textAlign: 'center', color: 'white'}}>
            {currentUser?.displayName || 'Entity Fodder'}!
          </Text>
        </View>
        <ColumnWrapper
          style={{
            height: '80%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{...styles.formWrapper}}>
            <TextInput
              onChangeText={typed => setName(typed)}
              placeholder="Enter your name"
              style={styles.input}
            />

            <View style={{...styles.button}}>
              <Button
                disabled={!name}
                onPress={onPressCreate}
                color="white"
                title="Create Game"
              />
            </View>
            <View style={{...styles.button}}>
              <Button
                disabled={!name}
                onPress={onPressJoin}
                color="white"
                title="Join Game"
              />
            </View>
          </View>
        </ColumnWrapper>
        <View>
          <TouchableWithoutFeedback onPress={() => auth.signOut()}>
            <Text style={{color: 'orange'}}>{'Sign Out'}</Text>
          </TouchableWithoutFeedback>
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
  formWrapper: {
    width: '100%',
    backgroundColor: '#002266',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  header: {
    height: '30%',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  button: {
    margin: 20,
    marginTop: 10,
    backgroundColor: '#841584',
    width: '75%',
    fontWeight: '400',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    height: 50,
    width: '80%',
    borderWidth: 2,
    marginBottom: 40,
  },
});
