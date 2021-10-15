import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

interface MainScreenPropType {

}

export const MainScreen = (props: MainScreenPropType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.subHeading}>Sub heading text</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Roboto-Bold',
    fontSize: 36,
  },
  subHeading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 26,
  }
});