//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student } from '../models/StudentModel';
import styles from '../styles';

const RegisterScreen: FC<{ route?: any,navigation: any }> = ({ navigation,route }) => {
    const [name, nameInput] = React.useState('');
    const [id, idInput] = React.useState('');
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');

    const onSave = async () => {
        console.log("Save")
        let editFlag = 0
        if (id == "") {
            console.log("ID can't be empty")
            alert("ID can't be empty")
            return navigation.navigate('PreLogin');
        }
        else if (name == "") {
            console.log("name can't be empty")
            alert("name can't be empty")
            return navigation.navigate('PreLogin');
        }
        else if (email == "") {
            console.log("email can't be empty")
            alert("email can't be empty")
            return navigation.navigate('PreLogin');
        }
        else if (password == "") {
            console.log("password can't be empty")
            alert("password can't be empty")
            return navigation.navigate('PreLogin');
        }
        else if (route.params != undefined) {
            editFlag = route.params.id
            if ((id != editFlag.toString()) && await StudentModel.exists(id, "id")) {
                console.log("ID already exists")
                alert("ID already exists")
                return navigation.navigate('PreLogin');
            }
            else if ((email != route.params.email.toString()) && await StudentModel.exists(email, "email")) {
                console.log("email already exists")
                alert("email already exists")
                return navigation.navigate('PreLogin');
            }
        }
        else if (await StudentModel.exists(id, "id")) {
            console.log("ID already exists")
            alert("ID already exists")
            return navigation.navigate('PreLogin');
        }
        else if (await StudentModel.exists(email, "email")) {
            console.log("email already exists")
            alert("email already exists")
            return navigation.navigate('PreLogin');
        }
        if (route.params != undefined) {
            StudentModel.deleteStudent(route.params.id)
        }
        const student: Student = {
            name: name,
            id: id,
            avatar_url: "temp",
            email: email,
            password: password
        }
        try {
            console.log("adding " + student.id)
            await StudentModel.addStudent(student);
        } catch (err) {
            console.log(err)
        }
        navigation.navigate('Home');
    }
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }

    return (
        <View style={mystyles.container}>
            <Image source={require('../assets/PreLogin.png')} style={mystyles.image} />
            <TextInput
                style={styles.textInput}
                onChangeText={nameInput}
                value={name}
                placeholder={"name"}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={idInput}
                value={id}
                placeholder={"id"}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={emailInput}
                value={email}
                placeholder={"email"}
            />
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
        fontSize: 30,
        backgroundColor: 'white',
        fontWeight: "bold"
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

export default RegisterScreen;
