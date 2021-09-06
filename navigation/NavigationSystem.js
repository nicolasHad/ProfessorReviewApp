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

const Drawer = createDrawerNavigator();

export function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNav} />
        <Drawer.Screen name="Favourites" component={FavouritesScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Write a review" component={NewReview} />
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
          name="HomeScreen" 
          component={MyDrawer} 
          options={{ title: 'HomeScreen' }}
        />
        <Stack.Screen 
         name="ProfessorPage" 
         component={ProfessorPage} 
         options={{ title: 'User Detail' }}
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
            } else if (route.name === 'Liked') {
              iconName = 'heart';
            } else if (route.name === 'Write') {
              iconName = 'add-circle'
            } else if (route.name === 'Professors') {
              iconName = 'search'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Liked" component={FavouritesScreen} />
        <Tab.Screen name="Professors" component={ProfessorsList} />
      </Tab.Navigator>
    
  );
}



