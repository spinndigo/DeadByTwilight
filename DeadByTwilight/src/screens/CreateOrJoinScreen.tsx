/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GameStackParamList} from '../navigators';
import {CreateRoomDialog, JoinRoomDialog} from '../components';
import shortid from 'shortid';
import {useCurrentUser, useGameChannel} from '../hooks';
import {global} from '../styles/global';
import {ColumnWrapper} from '../components/elements';
import {auth} from '../firebase/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigators/HomeTabs';

type NestedTabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'CreateOrJoin'>,
  NativeStackScreenProps<GameStackParamList>
>;

export const CreateOrJoinScreen: React.FC<NestedTabProps> = ({navigation}) => {
  const [id, setId] = useState<string | undefined>(
    shortid.generate().replace('I', 'i').replace('l', 'L'),
  );
  const {currentUser} = useCurrentUser();
  const {navigate, jumpTo} = navigation;
  const name = currentUser?.displayName || 'Anon';

  useGameChannel(id);

  const [showJoinAlert, setShowJoinAlert] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  useEffect(() => {
    if (!currentUser) navigate('AuthStack');
  }, [currentUser]);

  const onPressCreate = () => {
    setId(shortid.generate());
    setShowCreateRoom(true);
  };

  const onPressJoin = () => {
    setShowJoinAlert(true);
  };

  const onPressCreateSubmit = () => {
    setShowCreateRoom(false);
    navigate('Lobby', {didCreateRoom: true});
  };

  const onPressJoinSubmit = (joinId: string) => {
    setShowJoinAlert(false);
    setId(joinId);
    navigate('Lobby', {didCreateRoom: false});
  };

  return (
    <>
      <View style={{...styles.wrapper, ...global.screenWrapper}}>
        <View style={{top: 60}}>
          <Text style={{...styles.text, textAlign: 'center', color: 'white'}}>
            {'Welcome, '}
          </Text>
          <Text style={{...styles.text, textAlign: 'center', color: 'white'}}>
            {name}!
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
            <Text
              style={{
                ...styles.text,
                textAlign: 'center',
                color: 'white',
                marginBottom: 20,
              }}>
              {'Menu'}
            </Text>
            <View style={{...styles.button}}>
              <Button
                disabled={!name || !currentUser?.emailVerified}
                onPress={onPressCreate}
                color="white"
                title="Create Game"
              />
            </View>
            <View style={{...styles.button}}>
              <Button
                disabled={!name || !currentUser?.emailVerified}
                onPress={onPressJoin}
                color="white"
                title="Join Game"
              />
            </View>
            <View style={{...styles.button}}>
              <Button
                onPress={() => jumpTo('Account')}
                color="white"
                title="Account"
              />
            </View>
            <View style={{...styles.button}}>
              <Button
                disabled={!name}
                onPress={async () => await auth.signOut()}
                color="white"
                title="Sign Out"
              />
            </View>
            <Text style={{textAlign: 'center', color: 'white'}}>
              {currentUser?.emailVerified
                ? 'Email Verified'
                : 'You must verify your email before you can play'}
            </Text>
          </View>
        </ColumnWrapper>
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
    padding: 40,
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
