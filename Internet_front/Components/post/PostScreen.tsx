//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import PostModel, { Post } from '../../models/PostModel';
import styles from '../../styles';

const PostScreen: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    let [message, messageInput] = React.useState('');

    const onPost = async () => {
        try {
            if (message == "") {
                console.log("Cannot send an empty post")
                alert("annot send an empty post")
            }
            else {
                console.log("Posting from:  " + StudentModel.getCurrent().id)
                await PostModel.postPost(message)
                navigation.goBack()
            }
        } catch (err) {
            console.log(err)
        }

    }
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }

    return (
        <View style={mystyles.container}>
            <Image source={require('../../assets/PreLogin.png')} style={mystyles.image} />
            <Text style={mystyles.title}>{StudentModel.getCurrent().name}:</Text>
            <TextInput
                style={styles.textInput2}
                onChangeText={messageInput}
                value={message}
                placeholder={"Enter text:"}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onPost}>
                    <Text style={styles.buttonText1}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onBack}>
                    <Text style={styles.buttonText1}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 80,
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

export default PostScreen;
