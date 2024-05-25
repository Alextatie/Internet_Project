//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import PostModel, { Post } from '../../models/PostModel';
import styles from '../../styles';
import ActivityIndicator from '../Lottie';

const Posti: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    return (
        <View style={mystyles.container}>
            {route.params.sender_avatar == "x" && <Image style={styles.avatar2} source={require('../../assets/thumbs-up-cat.gif')} />}
            {route.params.sender_avatar != "x" && <Image style={styles.avatar2} source={{ uri: route.params.sender_avatar }} />}
            <Text style={mystyles.title}>{route.params.sender}:</Text>
            {route.params.type == "1" && <Text style={styles.textInput2}>{route.params.message}</Text>}
            {route.params.type == "2" && <View style={styles.textInput2}><Image style={styles.avatar4} source={{ uri: route.params.message }} /></View>}
        </View>
    );
}

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    image: {
        alignSelf: "center",
        height: 350,
        width: 475

    },
    title: {
        fontSize: 22,
        backgroundColor: 'white',
        fontWeight: "bold",
        color: "gray",
        marginLeft: 15
    },
    button: {
        flex: 1,
        backgroundColor: "silver",
        alignItems: "center",
        marginHorizontal: 5
    },
    buttonText: {
        padding: 5,
        fontSize: 25,
        color: "black"
    },
    tile: {
        alignSelf: "center",
        marginTop: 9,
        transform: [{ scale: 1.4 }]
    }


});

export default Posti;
