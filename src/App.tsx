import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from './navigation/AppNavigator';
import './reactotronConfig';

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="white"
        animated={true}
        barStyle="light-content"
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
};
