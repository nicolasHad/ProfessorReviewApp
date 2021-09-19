import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//TESTS
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

//Import Screens.
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InformationScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfessorsList from '../screens/ProfessorsList';
import WritePoemScreen from '../screens/WritePoemScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LogInScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } 
             else if (route.name === 'Professors') {
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
        <Tab.Screen name="Professors" component={ProfessorsList} />
      </Tab.Navigator>
    
  );
}

