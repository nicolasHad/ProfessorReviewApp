import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, RecyclerViewBackedScrollViewBase, ActivityIndicator } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 


export default class HeaderComponent extends React.Component {

    render() {
        return (
                <Header
                    placement="left"
                    leftComponent={<AntDesign name="user" size={24} color="white" />}
                    centerComponent={{ text: this.props.pageTitle, style: { color: '#fff' } }}
                    rightComponent={{ icon: this.props.iconName, color: '#fff' }}
                    centerContainerStyle={{ alignItems: "center" }}
                />
        )
    };

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },

});