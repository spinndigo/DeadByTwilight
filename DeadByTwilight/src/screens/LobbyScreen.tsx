import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
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
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: '#841584',
            width: '50%',
          }}>
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
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
