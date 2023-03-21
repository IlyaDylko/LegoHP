import Reactotron, {asyncStorage, networking} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// grabs the ip address
// const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

// The whole option object must be optional, or we will get a fatal error in beta/prod
// because the host will be undefine, which is considered an invalid behaviour
let configureOptions;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];
  configureOptions = {host: scriptHostname};
}

// @ts-ignore
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure(configureOptions)
  .use(networking())
  .useReactNative()
  .use(asyncStorage({}))
  .use(reactotronRedux())
  .connect();

export default reactotron;
