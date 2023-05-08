import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components';
import {TitleGradient} from '../assests';

export const TitleScreen: React.FC<{}> = () => (
  <View style={styles.wrapper}>
    <TitleGradient />
    <View style={styles.header}>
      <Text style={styles.text}> Dead by Twilight</Text>
    </View>
    <View style={{backgroundColor: '#841584', width: '50%'}}>
      <Button color="#fff" title="get started" />
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
