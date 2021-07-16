import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function InfoScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>InfoScreen</Text>
            <Text>Initial version of information screen.</Text>
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