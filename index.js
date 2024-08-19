import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './src/trackPlayerService';
import { LogBox } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

// Ignore specific warnings
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

