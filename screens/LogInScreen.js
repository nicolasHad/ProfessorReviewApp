//Import components from react/expo.
import React, { Component } from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Application from 'expo-application';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import Google app-auth
import * as Google from 'expo-google-app-auth';

//import firebase
import firebase from 'firebase';



export default class LoginScreen extends Component {

  isUserEqual=(googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


  onSignIn = googleUser=> {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.id_token,
          googleUser.accessToken
          );
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(){
          console.log('user signed in');
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };


    //Snippet from expo docs(https://docs.expo.io/versions/latest/sdk/google/)
    /*First obtain access token from Expo's Google API
      What does this code do: Propmpts the user to log into Google
      and grants  your app perrmission to access some of their Google data
      as specified by the scopes.*/

    signInWithGoogleAsync=async()=>{
      try {
        const result = await Google.logInAsync({
            //iosClientId: '<MY_IOS_CLIENT_ID_FOR_EXPO>',
            androidClientId: '115960728658-cdbossg7coqkg2v4hum2o7vlb903sk25.apps.googleusercontent.com',
            //iosStandaloneAppClientId: '<MY_IOS_CLIENT_ID>',
            //androifStandaloneAppClientId: '<MY_ANDROID_CLIENT_ID>',
            scopes: ['profile','email'],
            behavior: 'web',
        });
    
        if (result.type === 'success') {
          AsyncStorage.setItem('google_auth',JSON.stringify(result)).then(()=>{
            this.props.navigation.navigate('HomeScreen');
          })
          this.onSignIn(result);
          return result.accessToken;
        }
        else{
          return{cancelled:true};
        }
        
      } catch (e) {
        return { error: true };
      }
    }


    render(){
      return(
        <View style={styles.container}>
            <Text style={styles.title}>LoginScreen</Text>
            <Text>Initial version of LoginScreen.</Text>
            <Button title="Sign in with Google" onPress={()=>this.signInWithGoogleAsync()}></Button>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUpScreen')}>
                <Text>Don't have an account?Sign Up.</Text>
            </TouchableOpacity>
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