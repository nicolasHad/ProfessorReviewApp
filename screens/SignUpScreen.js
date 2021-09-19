//Import components from react/expo.
import React, { useState } from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as Application from 'expo-application';
import { Input } from 'react-native-elements/dist/input/Input';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';


//import Button from '@material-ui/core/Button';
import { Button } from 'react-native-elements';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';


//import Google app-auth.
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

//import firebase.
import firebase from 'firebase';

import { PoweroffOutlined } from '@ant-design/icons';



export default class SignUpScreen extends React.Component {

  state = {
    name: '',
    email: '',
    password: ''
  }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('HomeScreen'))

  }

  //-----------Google auth functions-----------------------------------------------------------
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function (result) {
          console.log('user signed in');
          const currentUser = firebase.auth().currentUser;
          const database = firebase.firestore();
          database
            .collection("users")
            .doc(currentUser.uid)
            .set({
              gmail: result.user.email,
              locale: result.additionalUserInfo.profile.locale,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name
            })
            .then(function (snapshot) {
              //console.log('Snapshot',snapshot);
            });
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error.message);
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '115960728658-3lptfan9k768m1urs09r6joo85112m47.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        this.onSignIn(result);
        let loggedInUser = result.user;
        this.props.navigation.navigate('HomeScreen');
        return result.accessToken;
      }
      else {
        return { cancelled: true };
      }

    } catch (e) {
      return { error: true };
    }
  }


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>
            Sheffield Reviews
          </Text>

        <FontAwesome.Button name="google" color="#DB4437" backgroundColor="white" onPress={() => this.signInWithGoogleAsync()}>
          Login with your University Google account
        </FontAwesome.Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  },
  buttonSignup: {
    fontSize: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },


})

