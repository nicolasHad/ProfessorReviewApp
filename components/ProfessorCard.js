import  React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, Button} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts} from 'expo-font';
import { Image } from 'react-native-elements/dist/image/Image';

import {Avatar, NativeBaseProvider} from 'native-base';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { getCurrentUserAsync } from 'expo-google-sign-in';
import { color } from 'react-native-elements/dist/helpers';
import { style } from 'styled-system';



export default function ProfessorCard(props) {

    let [fontsLoaded]=useFonts({
        'SourceSansSemiBold':require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
    });

    if (!fontsLoaded){
        return <AppLoading/>
    }

    else{
        return(
            <NativeBaseProvider>
            <View style={styles.view}>
                <Avatar style={styles.avatar}size="2xl"  source={{uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg",}}>
                    {props.fullname.substring(0,2)}
                </Avatar>
                <View style={{marginLeft:10,top:10,alignItems:'center'}}>
                    <Text style={{fontFamily:'Comfortaa',fontSize:25}}>
                        {props.fullname}
                    </Text>
                    <Text style={{fontFamily:'Comfortaa'}}>
                        {props.department}
                    </Text>
                </View>
            </View>
            </NativeBaseProvider>
            );
        }
    };

const styles = StyleSheet.create({
    view:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30   
    },

    avatar:{
        marginTop:50,
    },

    fullname:{ 
        fontFamily:'SourceSansSemiBold',
        fontSize:30,
        color:'white',
        marginTop:40,

    },

});