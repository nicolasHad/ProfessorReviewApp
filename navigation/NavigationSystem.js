//Import components from react/expo.
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import Screens.
import FavouritesScreen from '../screens/FavouritesScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewProfessor from '../screens/NewProfessor';
import ProfessorPage from '../screens/ProfessorPage';
import HomeScreen from '../screens/HomeScreen';
import ProfessorsList from '../screens/ProfessorsList';
import NewReview from '../screens/NewReview';

import { Ionicons } from '@expo/vector-icons';

import HeaderComponent from '../components/Header';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNav} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Favourites" component={FavouritesScreen} />
        </Drawer.Navigator>
    );
}


const Stack = createStackNavigator();

export function MyStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
          }}
        >
          <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ title: 'Feed' }}
          iconName='Home'
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={MyDrawer} 
          options={{ title: 'Feed' }}
          iconName='Home'
        />
        <Stack.Screen 
         name="ProfessorPage" 
         component={ProfessorPage} 
         options={{ title: 'Reviews' }}
        />
      </Stack.Navigator>
    );
  }


const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Professors') {
              iconName = 'search'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Professors" component={ProfessorsList} />
      </Tab.Navigator>
    
  );
}



