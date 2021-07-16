import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeScreen</Text>
            <Text>Initial version of homescreen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:20,
        fontWeight:'bold', 
    },

});