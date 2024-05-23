//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import PostModel, { Post } from '../../models/PostModel';
import styles from '../../styles';

const EditablePost: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    let [message, messageInput] = React.useState('');

    const onEdit = async () => {
        try {
            navigation.navigate("EditedPost", { id: route.params.id })
        } catch (err) {
            console.log(err)
        }
    }
    const onDelete = async () => {
        try {
            await PostModel.deletePost(route.params.id)
            navigation.goBack()
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
            <Text style={styles.textInput2}>{route.params.message}</Text>
            <View style={styles.buttons}>
                <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button8} onPress={onEdit}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button9} onPress={onDelete}>
                    <Text style={styles.buttonText4}>DLT</Text>
                    </TouchableOpacity>
                </View>
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

export default EditablePost;
