import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';
import styles from '../styles';

const EditableProfile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const onName = async () => {
        console.log("Edit Name")
        navigation.navigate('NameEdit');
    }
    const onEmail = async () => {
        console.log("Edit Email")
        navigation.navigate('EmailEdit');
    }
    const onPassword = async () => {
        console.log("Edit Password")
        navigation.navigate('PasswordEdit');
    }
    const onAvatar = async () => {
        console.log("Edit Avatar")
        //navigation.navigate('NameEdit');
    }
    const onDelete = async () => {
        console.log("Delete User")
        navigation.navigate('DeleteUser');
    }
    const onPosts = async () => {
        console.log("User Posts")
        navigation.navigate('UserPosts');
    }

    return (
        <View style={mystyles.container}>
            <View style={mystyles.row}>
                <Image style={mystyles.avatar} source={require('../assets/thumbs-up-cat.gif')} />
                <TouchableOpacity style={styles.button3} onPress={onAvatar}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"name:  " }</Text>
                    <Text style={mystyles.input1}>{route.params.name}</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onName}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"Password:  "}</Text>
                    <Text style={mystyles.input1}>{route.params.id}</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onPassword}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"Email:  "}</Text>
                    <Text style={mystyles.input1}>{route.params.email}</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onEmail}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"ID:  "}</Text>
                    <Text style={mystyles.input1}>{route.params.id}</Text>
                </View>
                <TouchableOpacity style={styles.button4} onPress={onDelete}>
                    <Text style={styles.buttonText4}>DLT</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
            <TouchableOpacity style={styles.button} onPress={onPosts}>
                <Text style={styles.buttonText1}>Posts</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mystyles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 240,
        marginHorizontal: 20,
        justifyContent: "space-between"

    },
    row: {
        paddingTop: 3,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: "center",
        
  
    },
    panel: {
        height: 64,
        paddingLeft: 7,
        borderWidth: 3,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'column',
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

export default EditableProfile;