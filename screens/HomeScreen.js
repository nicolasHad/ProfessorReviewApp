import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, RecyclerViewBackedScrollViewBase} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts} from 'expo-font';


export default function HomeScreen(){

    let [fontsLoaded]=useFonts({
        'Comfortaa':require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
        'Roboto-Regular':require('../assets/fonts/Roboto-Regular.ttf')
    });
    if (!fontsLoaded){
        return <AppLoading/>
    }else{
    return (
        <ScrollView style={styles.container}>
            <Text style={{fontFamily:'Comfortaa',fontSize:50,left:10,
            top:0,paddingBottom:20}}>Home</Text>
        
        </ScrollView>
    );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: StatusBar.currentHeight
        //alignItems:'center',
        //justifyContent:'center',
    },
    titleView:{
        justifyContent:'flex-start',
        top:20,
        paddingBottom:50
    }

});