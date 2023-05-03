import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components';
import {TitleGradient} from '../assests';

export const TitleScreen: React.FC<{}> = () => (
  <View style={styles.wrapper}>
    <TitleGradient />
    <Text style={styles.header}> Dead by Twilight</Text>
    <Button title={'Start'} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(156,118,76,1) 31%, rgba(0,212,255,1) 100%)',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
});
