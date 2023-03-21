import {useRoute} from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';

export const WebViewPage = () => {
  const route = useRoute();
  const {url} = route.params;
  return <WebView source={{uri: url}} />;
};
