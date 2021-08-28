/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'; // REQUIRED REACT NAVIGATION PACKAGE IN ROOT FILE


AppRegistry.registerComponent(appName, () => App);
