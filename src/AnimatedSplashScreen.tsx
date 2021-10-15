import React, {useEffect, useMemo, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import {StyleSheet, Image} from 'react-native';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

interface AnimatedSplashScreenPropType {
  children: React.ReactNode | React.ReactNode[];
}

import splashImage from '../assets/splash.png';

export const AnimatedSplashScreen = ({children}: AnimatedSplashScreenPropType) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false);
  // Shared value between JS and UI thread
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isSplashReady) {
      // start the animation
      opacity.value = 0;
    }
  }, [isSplashReady]);

  // once logo has loaded then we can hide the splash screen
  // and start the animation
  const onImageLoaded = useMemo(
    () => async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // handle errors
      } finally {
        setIsSplashReady(true);
      }
    },
    []
  );

  // Called from the UI thread.  This allows us to remove
  // our animated splash component so we are able to interact
  // with the home screen component
  const onAnimationEnd = () => {
    setIsSplashAnimationComplete(true);
  };

  // fade animation for our splash screen
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        500,
        withTiming(
          opacity.value,
          {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
          },
          // called from the UI thread allowing us to change the state
          () => runOnJS(onAnimationEnd)()
        )
      )
    };
  });

  return (
    <>
      {isSplashReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          style={[StyleSheet.absoluteFill, {backgroundColor: Constants.manifest?.splash?.backgroundColor || 'white'}, animatedStyle]}>
          <Image
            source={splashImage}
            // this prop is required for Android otherwise it will fade in our icon and
            // we will be able to see this transation on our animated splash screen
            fadeDuration={0}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: Constants.manifest?.splash?.resizeMode || 'contain'
            }}
            onLoadEnd={onImageLoaded}
          />
        </Animated.View>
      )}
    </>
  );
};