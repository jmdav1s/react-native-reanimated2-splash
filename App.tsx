import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AnimatedAppLoader } from './src/AnimatedAppLoader';
import { MainScreen } from './src/MainScreen';

// Instruct SplashScreen not to hide
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  return (
    <AnimatedAppLoader>
      <MainScreen />
    </AnimatedAppLoader>
  );
}
