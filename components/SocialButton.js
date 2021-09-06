import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Application from 'expo-application';


export function SocialButton(props) {
     
    const title=props.title
    return <Button 
        title="title"
        color={props.buttonColor}
        backgroundColor={props.backgroundColor}
        onPress={props.onPress}
        accesibilityLabel={props.accesibilityLabel}
        disabled={props.disabled}
        >
    </Button>
}