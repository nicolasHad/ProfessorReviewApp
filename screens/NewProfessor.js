import * as React from 'react';
import { StyleSheet, Text, View,TextInput,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


export default class NewProfessor extends React.Component {

    state={
        fullname: '',
        department:'',
        email:''
    };

    database=firebase.firestore();

    addProfessor =()=>{
        const{fullname,department,email}=this.state;
        var key = email.substr(0,email.indexOf('@'));
        this.database.collection("professors").doc(key).set({
            name: fullname,
            department: department,
            email: email
        })
        this.props.navigation.navigate('HomeScreen');
    }


    
    
    render(){
    return (
        <View style={styles.container}>
            <TextInput
                value={this.state.fullname}
                placeholder='Full name'
                onChangeText={fullname=>this.setState({fullname})}
            />

            <TextInput
                value={this.state.department}
                placeholder='Home department'
                onChangeText={department=>this.setState({department})}
            />
            <TextInput
                value={this.state.email}
                placeholder='Email address'
                onChangeText={email=>this.setState({email})}
            />
            <TouchableOpacity onPress={this.addProfessor}>
                <Text>Add professor</Text>
            </TouchableOpacity>
        </View>
    );
    };
    
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    titleView:{
        justifyContent:'flex-start',
        top:80,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        fontSize:50,
    },

});
