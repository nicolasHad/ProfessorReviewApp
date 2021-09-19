import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, RecyclerViewBackedScrollViewBase, ActivityIndicator } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import firebase from 'firebase';
import { Avatar, NativeBaseProvider } from 'native-base';
import { ListItem } from 'react-native-elements';
import ReviewCard from '../components/ReviewCard';

import HeaderComponent from '../components/Header';

import { SafeAreaProvider } from 'react-native-safe-area-context';


class HomeScreen extends React.Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('reviews').orderBy("created", "desc").limit(10);
    this.state = {
      isLoading: true,
      reviewArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const reviewArr = [];
    querySnapshot.forEach((res) => {
      const { body, professorId, fullname, created } = res.data();
      reviewArr.push({
        key: res.id,
        res,
        body,
        fullname,
        professorId,
        created: res.get('created', this.estimateTimestamps)
      });
    });
    this.setState({
      reviewArr,
      isLoading: false,
    });
  }
  estimateTimestamps = {
    serverTimestamps: 'estimate'
  }

  render() {
    /*if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }*/
    return (

      <SafeAreaProvider>
        <HeaderComponent iconName="home" pageTitle="Reviews Feed" />
        <ScrollView style={styles.container}>

          {
            this.state.reviewArr.map((item, i) => {


              return (
                <View>
                  <ReviewCard professorId={item.fullname} body={item.body} createdAt={item.created.toDate().toLocaleDateString('de-DE')} />
                </View>
              );
            })
          }
        </ScrollView>
      </SafeAreaProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'center',
    //justifyContent:'center',
  },
  titleView: {
    justifyContent: 'flex-start',
    top: 20,
    paddingBottom: 50
  }

});
export default HomeScreen;
