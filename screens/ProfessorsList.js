// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, ActivityIndicator, View, Text, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import { Searchbar } from 'react-native-paper';
import { Avatar, NativeBaseProvider } from 'native-base';
import HeaderComponent from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

class ProfessorsList extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('professors');
    this.state = {
      isLoading: true,
      profArr: [],
      profsFiltered: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const profArr = [];
    const profsFiltered = [];
    querySnapshot.forEach((res) => {
      const { fullname, department, email } = res.data();
      profArr.push({
        key: res.id,
        res,
        fullname,
        department,
        email,
      });
      profsFiltered.push({
        key: res.id,
        res,
        fullname,
        department,
        email,
      });
      //console.log(profArr);
    });
    this.setState({
      profArr,
      profsFiltered,
      isLoading: false,
    });
  }

  searchProf(textToSearch) {
    this.setState({
      profsFiltered: this.state.profArr.filter(i =>
        i.fullname.toLowerCase().includes(textToSearch.toLowerCase())),
    });
  }

  render() {
    if (this.state.isLoading && !this.fontsLoaded) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <HeaderComponent iconName="list" pageTitle="Professor's list" />

          <ScrollView style={styles.container}>

            <Searchbar placeholder="Search Here" onChangeText={text => { this.searchProf(text) }} />
            {
              this.state.profsFiltered.map((item, i) => {
                return (
                  <View>
                    <ListItem
                      key={i}
                      chevron="true"
                      bottomDivider
                      onPress={() => {
                        this.props.navigation.navigate('ProfessorPage', {
                          professorKey: item.key
                        });
                      }}
                    >
                      <Avatar source={{ uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg", }}>
                        {item.fullname.substring(0, 2)}
                      </Avatar>

                      <ListItem.Content>
                        <ListItem.Title>{item.fullname}</ListItem.Title>
                        <ListItem.Subtitle>{item.department}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </View>
                );
              })
            }
          </ScrollView>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProfessorsList;