import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';


export default class LoadingScreen extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged(user=>
        {
            if(user){
                this.props.navigation.navigate('HomeScreen');
            }
            else{
                this.props.navigation.navigate('LoginScreen');
            }
        });
    };

    render() {
        return(
        <View style={styles.container}>
           <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    };
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