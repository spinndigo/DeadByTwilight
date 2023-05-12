/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Pusher} from '@pusher/pusher-websocket-react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DefaultStack} from './src/navigators';
import {NavigationContainer} from '@react-navigation/native';

const pusher = Pusher.getInstance();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    async function initPusher() {
      await pusher.init({
        apiKey: 'b16adf11ba39c8f28218',
        cluster: 'mt1',
      });
    }
    initPusher();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <DefaultStack />
    </NavigationContainer>
  );
}

export default App;
