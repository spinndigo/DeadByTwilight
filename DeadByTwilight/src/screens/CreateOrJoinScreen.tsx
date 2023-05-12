import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components';

export const CreateOrJoinScreen: React.FC<{}> = () => (
  <View style={styles.wrapper}>
    <View style={{margin: 40, backgroundColor: '#841584', width: '50%'}}>
      <Button color="white" title="Create Game" />
    </View>
    <View style={{margin: 40, backgroundColor: '#841584', width: '50%'}}>
      <Button color="white" title="Join Game" />
    </View>
  </View>
);

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
});
