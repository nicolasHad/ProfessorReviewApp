import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Application from 'expo-application';

import firebase from 'firebase';
import { firebaseConfig } from './config';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNav from './navigation/BottomNavigation'; //Import tab navigator.


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>
          <BottomTabNav />
      </NavigationContainer>
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
