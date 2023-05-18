import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from '../components';
import {TitleGradient} from '../assests';
import {DefaultStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const TitleScreen: React.FC<
  NativeStackScreenProps<DefaultStackParamList, 'Title'>
> = ({navigation}) => (
  <SafeAreaView>
    <View style={styles.wrapper}>
      <TitleGradient />
      <View style={styles.header}>
        <Text style={styles.text}> Dead by Twilight</Text>
      </View>
      <View style={{backgroundColor: '#841584', width: '50%'}}>
        <Button
          onPress={() => navigation.navigate('CreateOrJoin')}
          color="#fff"
          title="get started"
        />
      </View>
    </View>
  </SafeAreaView>
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
