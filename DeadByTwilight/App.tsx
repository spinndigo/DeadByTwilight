/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import 'react-native-devsettings';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DefaultStack} from './src/navigators';
import {NavigationContainer} from '@react-navigation/native';
import {PusherWrapper} from './src/components';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PusherWrapper>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <DefaultStack />
      </NavigationContainer>
    </PusherWrapper>
  );
}

export default App;
