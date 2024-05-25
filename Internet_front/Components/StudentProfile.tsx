import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';
import styles from '../styles';
import ActivityIndicator from './Lottie';

const StudentProfile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
 
    return (
        <View style={mystyles.container}>
            {route.params.avatar_url == "" && <Image style={styles.avatar2} source={require('../assets/thumbs-up-cat.gif')} />}
            {route.params.avatar_url != "" && <Image style={styles.avatar2} source={{ uri: route.params.avatar_url }} />}
            <View style={mystyles.panel}>
                <View>
                <Text style={mystyles.input2}>{"name:  " }</Text>
                    <Text style={mystyles.input1}>{route.params.name}</Text>
                </View>
            </View>
            <View style={mystyles.panel}>
            <View>
                <Text style={mystyles.input2}>{"id:  " }</Text>
                    <Text style={mystyles.input1}>{+ route.params.id}</Text>
                </View>
            </View>
                <View style={mystyles.panel}>
                    <View>
                <Text style={mystyles.input2}>{"email:  " }</Text>
                        <Text style={mystyles.input1}>{route.params.email}</Text>
                    </View>
            </View >
        </View>
    );
}

const mystyles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 280,
        marginHorizontal: 20,
        justifyContent: "space-between"

    },
    panel: {
        paddingLeft: 7,
        paddingTop:3,
        marginTop: StatusBar.currentHeight,
        borderWidth: 3,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        borderColor: "#75B8D4"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',

    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    input1: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#275061",
        textAlign: "left"
    },
    input2: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#75B8D4"
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        padding: 10
    }

});

export default StudentProfile;