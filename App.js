//Import components from react/expo.
import React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';



import firebase from 'firebase';
import { firebaseConfig } from './config';

import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './navigation/NavigationSystem'; 
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ProfessorPage from './screens/ProfessorPage';

import { MyStack } from './navigation/NavigationSystem';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
