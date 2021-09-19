import React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ListItem, Button, Icon } from 'react-native-elements';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';



export default function ReviewCard(props) {

    let [fontsLoaded] = useFonts({
        'SourceSansSemiBold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    else {
        return (
            <NativeBaseProvider>
                <View style={styles.view}>
                    <Card >
                        <CardTitle
                            title={"Review for "+props.professorId}
                            subtitle={props.createdAt}
                            avatarSource={{uri: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"}}
                        />
                        <CardContent text={"Review:"+props.body} />
                        <CardAction
                            separator={false}
                            inColumn={false}>

                        </CardAction>
                    </Card>
                </View>
            </NativeBaseProvider>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        alignItems:'center'
    },

});