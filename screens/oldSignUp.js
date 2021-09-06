//Import components from react/expo.
import React, { useState } from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View} from 'react-native';
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



export default function SignUpScreen({navigation}){

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const signUp=async()=>{
        try{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>this.props.navigation.navigate('HomeScreen'));
            //sendEmailVerification();
        }
        catch(error){
            setError(error.message)
        }
    }

    const sendEmailVerification=async()=>{
        firebase.auth().currentUser.sendEmailVerification();
    }

    const isUserEqual=(googleUser, firebaseUser) => {
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

    const onSignIn = googleUser=> {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
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
        });
      };   
    
    const signInWithGoogleAsync=async()=>{
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
            onSignIn(result);
            return result.accessToken;
          }
          else{
            return{cancelled:true};
          }
          
        } catch (e) {
          return { error: true };
        }
      }

      async function logInWithFacebook() {

        try{
            await Facebook.initializeAsync({
                appId: '374012037473504',
              });
        
            const {type,token}=await Facebook.logInWithReadPermissionsAsync({permissions:['public_profile','email','user_friends'],});

            if(type==='success'){
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&id,name,email,about,picture`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                this.props.navigation.navigate('HomeScreen');

                console.log('INFO', await response.json());
                //console.log('response',response);

                try{
                    await firebase.auth().signInWithCredential(token);
                }catch(error){
                    console.error(error);
                }
            }
            else{
                alert(type);
            }


      }catch({message}){
        alert(`Facebook Login Error: ${message}`);
      }
    }
    


    return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Ionicons style={styles.logoV} name='logo-twitter' size={70} color='#1DA1F2'/>
          </View>
          <View style={{ position:'relative',left:-10,justifyContent: "center",width:300 }}>
            <Text style={styles.title}>
              See what's happening in the world right now.
            </Text>
          </View>
            <Text style={{marginTop:10,marginBottom:30,fontSize:15,fontWeight:'bold',left:-102,color:'#1DA1F2' }}>Join Poeti today.</Text>
            <Input inputStyle={styles.inputStyle} inputContainerStyle={styles.input} containerStyle={styles.inputContainer} placeholder="Enter your email" leftIcon={<Ionicons  name='mail' size={24} color='gray'/>}style={styles.input} value={email} onChangeText={setEmail}></Input>
            <Input inputStyle={styles.inputStyle} inputContainerStyle={styles.input} containerStyle={styles.inputContainer} placeholder="Enter your password" leftIcon={<Ionicons  name='lock-closed-sharp' size={24} color='gray'/>}style={styles.input} value={password} onChangeText={setPassword} secureTextEntry></Input>
            {
                error?
                <Text style={{color:'red'}}>{error}</Text>
                :null
            }

            <FontAwesome.Button color="gray" backgroundColor="white"  onPress={()=>signUp()}>
              Sign Up
           </FontAwesome.Button>
            
            <FontAwesome.Button name="google" color="#DB4437" backgroundColor="white"  onPress={()=>logInWithFacebook()}>
              Login with Google
           </FontAwesome.Button>

            <FontAwesome.Button name="facebook" color="#4267B2" backgroundColor="white"  onPress={()=>logInWithFacebook()}>
              Login with Facebook
           </FontAwesome.Button>
           
            <TouchableOpacity onPress={()=>navigation.navigate('LogInScreen')}>
                <Text style={styles.text}>Already have an account?Sign In.</Text>
            </TouchableOpacity>
           

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
    input:{
      width:300,     
    },

    logoView:{
      right:130
    },

    inputContainer:{
      alignItems:'center',
      color:'white' 
    },

    text:{
      color:'gray',
    },

    inputStyle:{
      color:'gray',
    }

});

<Button

>
Save
</Button>