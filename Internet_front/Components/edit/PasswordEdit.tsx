//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import styles from '../../styles';

const PasswordEdit: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    let [password, passwordInput] = React.useState('');

    const onSave = async () => {
        try {
            if (password == "") {
                console.log("Cannot have empty fields")
                alert("Cannot have empty fields")
                //return navigation.navigate('PreLogin');
            }
            else {
                console.log("Editing " + StudentModel.getCurrent().id)
                await StudentModel.Edit(password, "password")
            }
        } catch (err) {
            console.log(err)
        }
        navigation.navigate('EditableProfile', {
            id: StudentModel.getCurrent().id,
            email: StudentModel.getCurrent().email,
            password: StudentModel.getCurrent().password
        });
    }
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }

    return (
        <View style={mystyles.container}>
            <Image source={require('../../assets/PreLogin.png')} style={mystyles.image} />
            <Text style={mystyles.title}>Old password: *********</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={passwordInput}
                value={password}
                placeholder={"password"}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText1}>Save</Text>
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

export default PasswordEdit;
