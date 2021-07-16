import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function WritePoemScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Write a poem screen</Text>
            <Text>Initial version of write a poem page.</Text>
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