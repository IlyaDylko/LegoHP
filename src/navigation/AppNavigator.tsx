import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {Details} from '../Details/Details';

import {Main} from '../Main';
import {Summary} from '../Summary/Summary';
import {WebViewPage} from '../WebView';

const Stack = createStackNavigator();

export const routes = {
  MAIN: 'Main',
  DETAILS: 'Details',
  SUMMARY: 'Summary',
  WEB_VIEW: 'WebView',
};

export const AppNavigator = (): ReactElement => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={routes.MAIN}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={routes.MAIN}
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.DETAILS}
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.SUMMARY}
        component={Summary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.WEB_VIEW}
        component={WebViewPage}
        options={{
          headerShown: true,
          headerTitle: 'Minifig Page',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
