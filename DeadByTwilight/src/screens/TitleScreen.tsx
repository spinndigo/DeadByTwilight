/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, Button, Text, StyleSheet, Animated} from 'react-native';
import {DefaultStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {global} from '../styles/global';
import {useCurrentUser} from '../hooks';

export const TitleScreen: React.FC<
  NativeStackScreenProps<DefaultStackParamList, 'Title'>
> = ({navigation}) => {
  const {isLoggedIn} = useCurrentUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <>
      <View style={{...styles.wrapper, ...global.screenWrapper}}>
        <View style={styles.header}>
          <Text style={styles.text}>Dead by</Text>
          <Animated.Text style={{...styles.text, opacity: fadeAnim}}>
            Twilight
          </Animated.Text>
        </View>
        <View style={{backgroundColor: '#841584', width: '50%'}}>
          <Button
            onPress={() => navigation.navigate('App')}
            color="#fff"
            title="get started"
          />
        </View>
      </View>
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
    flexWrap: 'nowrap',
  },
  button: {
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
