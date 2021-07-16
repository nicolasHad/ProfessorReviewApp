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
import SearchScreen from '../screens/SearchScreen';
import WritePoemScreen from '../screens/WritePoemScreen';

const Tab=createBottomTabNavigator();

export default function BottomTabNav(){
    return (

        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Liked') {
              iconName = 'heart';
            } else if (route.name==='Write'){
              iconName='add-circle'
            } else if (route.name==='Search'){
              iconName='search'
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
            <Tab.Screen name="Write" component={WritePoemScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>

    );
}

