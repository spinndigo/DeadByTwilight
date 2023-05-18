import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from '../components';
import {DefaultStackParamList} from '../navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const LobbyScreen: React.FC<
  NativeStackScreenProps<DefaultStackParamList, 'Lobby'>
> = ({route}) => {
  const [isReady, setIsReady] = useState(false);
  const {id, name} = route.params;

  const onStartGame = () => undefined;

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}> Lobby </Text>
        </View>
        <View>
          <Text> {`Player : ${name}`} </Text>
        </View>
        <View>
          <Text> {`Game Id : ${id}`} </Text>
        </View>
        <View style={{backgroundColor: '#841584', width: '50%'}}>
          <Button
            disabled={isReady}
            onPress={onStartGame}
            color="#fff"
            title="Start Game"
          />
        </View>
      </View>
    </SafeAreaView>
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
});
