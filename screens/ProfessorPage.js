// screens/professorDetailScreen.js

import React, { Component } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Button, TextInput, ScrollView, ActivityIndicator, View, Modal, Text } from 'react-native';
import firebase from 'firebase';
import ProfessorCard from '../components/ProfessorCard';
import { ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { IconButton, Colors } from 'react-native-paper';
import { query, orderBy, limit } from "firebase/firestore";
import { style } from 'styled-system';
import HeaderComponent from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';



class ProfessorPage extends Component {

  constructor() {
    super();
    this.state = {
      key: '',
      fullname: '',
      department: '',
      email: '',
      reviewArr: [],
      isLoading: true,
      openModal: false,
      body: '',
    };
  }

  onClickButton = e => {
    e.preventDefault()
    this.setState({ openModal: true })
  }

  onCloseModal = () => {
    this.setState({ openModal: false })
  }


  componentDidMount() {
    const dbRef = firebase.firestore().collection('professors').doc(this.props.route.params.professorKey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const professor = res.data();
        this.setState({
          key: res.id,
          fullname: professor.fullname,
          email: professor.email,
          department: professor.department,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
      this.firestoreRefReviews = firebase.firestore().collection('reviews').orderBy("created", "desc");
      this.unsubsrcibe = this.firestoreRefReviews.where("professorId", "==", res.id).onSnapshot(this.getCollection);
    });
  }

  componentWillUnmount() {
    this.unsubsrcibe();
  }

  estimateTimestamps = {
    serverTimestamps: 'estimate'
  }

  getCollection = (querySnapshot) => {
    const reviewArr = [];
    querySnapshot.forEach((res) => {
      const { body, professorId, created } = res.data();
      reviewArr.push({
        key: res.id,
        res,
        body,
        professorId,
        created: res.get('created', this.estimateTimestamps)
      });
    });
    this.setState({
      reviewArr,
      isLoading: false,
    });
  }


  addReview = () => {
    const { body } = this.state;
    firebase.firestore().collection("reviews").add({
      body: body,
      professorId: this.state.key,
      fullname: this.state.fullname,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => this.onCloseModal);
    this.setState({
      body: '',
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
        <HeaderComponent  pageTitle={this.state.fullname} />


          <ProfessorCard fullname={this.state.fullname} department={this.state.department} />

          <IconButton
            style={styles.inputGroup2}
            icon="tooltip-plus-outline"
            color={Colors.red500}
            size={30}
            onPress={this.onClickButton}
          />


          <Modal style={styles.modal} visible={this.state.openModal} animationType="fade" transparent={true}>

            <View style={styles.modalView}>
              <TextInput
                value={this.state.body}
                placeholder='Write a review'
                onChangeText={body => this.setState({ body })}
                style={styles.reviewInput}
                multiline={true}
                numberOfLines={10}
              />

              <TouchableWithoutFeedback onPress={() => { this.addReview(); this.onCloseModal(); }}>
                <View style={styles.button}>
                  <Text> Add Review </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={this.onCloseModal} >
                <View style={styles.button}>
                  <Text> Close Form </Text>
                </View>
              </TouchableWithoutFeedback>

            </View>

          </Modal>
        </View>

        {
          this.state.reviewArr.map((item, i) => {
            return (
              <View>
                <ListItem
                  key={i}
                  chevron="true"
                  bottomDivider
                  containerStyle={{ backgroundColor: 'transparent' }}
                >
                  <Ionicons
                    name="md-chatbox-ellipses-outline"
                    color={Colors.red500}
                    size={20}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontFamily: 'Roboto', fontSize: 15, color: '#626262' }}>{item.body}</ListItem.Title>
                    <ListItem.Title style={{ fontFamily: 'Roboto', fontSize: 15, color: '#626262' }}>{item.created.toDate().toLocaleDateString('de-DE')}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 15,
    marginBottom: 5
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputGroup2: {
    left: 170
  },
  modalView: {
    margin: 50,
    width: 300,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }

})

export default ProfessorPage;
