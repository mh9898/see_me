/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// gitKaren dev 
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useCameraPermission, Camera, useCameraDevice } from 'react-native-vision-camera';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MyPhoto from './components/MyPhoto';





function App(): JSX.Element {

  const { hasPermission, requestPermission } = useCameraPermission()
  

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MyPhoto />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
