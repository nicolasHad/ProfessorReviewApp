// screens/professorDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Modal } from 'react-native';
import firebase from 'firebase';
import ProfessorCard from '../components/ProfessorCard';
import { ListItem } from 'react-native-elements'
import { Ionicons, AntDesign } from '@expo/vector-icons';




class ProfessorPage extends Component {

  constructor() {
    const [ModalOpen,SetModalOpen]=useState(false);
    super();
    this.state = {
      key: '',
      fullname: '',
      department: '',
      email: '',
      reviewArr:[],
      isLoading: true,
    };
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
      this.firestoreRefReviews=firebase.firestore().collection('reviews');
      this.unsubsrcibe=this.firestoreRefReviews.where("professorId","==",res.id).onSnapshot(this.getCollection);
    });
  }

  componentWillUnmount(){
    this.unsubsrcibe();
  }

  getCollection = (querySnapshot) => {
    const reviewArr = [];
    querySnapshot.forEach((res) => {
      const { body, professorId} = res.data();
      reviewArr.push({
        key: res.id,
        res,
        body,
        professorId,
      });
      //console.log(profArr);
    });
    this.setState({
      reviewArr,
      isLoading: false,
   });
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <ProfessorCard fullname={this.state.fullname} department={this.state.department}/>
            <Ionicons name="home" onPress={()=>this.setModalOpen(true)}/>

            <Modal
              visible={modalOpen}>
                <View><Text>Hello</Text></View>
                <Ionicons name="home" onPress={()=>this.setModalOpen(false)}/>
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
                  containerStyle={{backgroundColor:'transparent'}}
                >
                    <ListItem.Content>
                        <ListItem.Title style={{fontFamily:'Roboto', fontSize:15,color:'#626262'}}>{item.body}</ListItem.Title>
                        <ListItem.Subtitle>2/3/2020</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                </View>
              );
            })
          }



      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    marginBottom: 7, 
  },

})

export default ProfessorPage;
