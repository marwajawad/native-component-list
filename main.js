import Expo from 'expo';

import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await cacheAssetsAsync({
      images: [require('./assets/images/exponent-icon.png')],
      fonts: [
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
      ],
      videos: [require('./assets/videos/ace.mp4')],
    });

    this.setState({ appIsReady: true });
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container} testID="native_component_list">
          <NavigationProvider router={Router}>
            <StackNavigation id="root" initialRoute="home" />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
        </View>
      );
    } else {
      return <Expo.Components.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
