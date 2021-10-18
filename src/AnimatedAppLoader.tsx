import React from 'react';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import { AnimatedSplashScreen } from './AnimatedSplashScreen';

interface AnimatedAppLoaderPropType {
  children: React.ReactNode | React.ReactNode[];
}

export const AnimatedAppLoader = ({ children }: AnimatedAppLoaderPropType) => {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const timeOut = () => {
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  };

  // load some fonts
  const loadFonts = () => {
    return Font.loadAsync({
      'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf')
    });
  };

  // cache some images
  const loadImages = () => {
    return Asset.loadAsync([require('../assets/splash.png')]);
  };

  const startAsync = (): Promise<any> => {
    return Promise.all([
      loadFonts(),
      loadImages(),
      timeOut() // so some other stuff
    ]);
  };

  if (!isSplashReady) {
    return <AppLoading autoHideSplash={false} startAsync={startAsync} onError={console.error} onFinish={() => setSplashReady(true)} />;
  }

  return <AnimatedSplashScreen>{children}</AnimatedSplashScreen>;
};
