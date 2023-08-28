import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {global} from '../styles/global';
import {ColumnWrapper} from '../components/elements';
import {auth} from '../firebase/config';
import {useCurrentUser} from '../hooks';
import {sendEmailVerification} from 'firebase/auth';
export const AccountScreen: React.FC<{}> = () => {
  const {currentUser} = useCurrentUser();

  if (!currentUser) return null;

  return (
    <View style={{...styles.wrapper, ...global.screenWrapper}}>
      <ColumnWrapper>
        <View style={{...styles.formWrapper}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: 20,
              ...styles.text,
            }}>
            {'Account'}
          </Text>
          <View style={{...styles.button}}>
            <Button
              disabled={auth.currentUser?.emailVerified}
              onPress={() => sendEmailVerification(currentUser)}
              color="white"
              title="Send verification email"
            />
          </View>
          <View style={{...styles.button}}>
            <Button
              onPress={() => undefined}
              color="white"
              title="Delete Account"
            />
          </View>
        </View>
      </ColumnWrapper>
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
    padding: 10,
    backgroundColor: '#841584',
    width: '75%',
    minWidth: '75%',
    fontWeight: '400',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
