import * as React from 'react';
import { StyleSheet, Text, View,TextInput,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


export default class NewReview extends React.Component {

    state={
        body: '',
        professorId:'',
    };

    database=firebase.firestore();

    addReview =()=>{
        const{body,professorId}=this.state;
        this.database.collection("reviews").add({
            body: body,
            professorId: professorId
        }).then(this.props.navigation.navigate('HomeScreen'));
    }


    
    
    render(){
    return (
        <View style={styles.container}>
            <TextInput
                value={this.state.body}
                placeholder='Write a review'
                onChangeText={body=>this.setState({body})}
            />

            <TextInput
                value={this.state.professorId}
                placeholder='ProfessorID'
                onChangeText={professorId=>this.setState({professorId})}
            />
            <TouchableOpacity onPress={this.addReview}>
                <Text>Add review</Text>
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
