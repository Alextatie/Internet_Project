//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Login } from '../models/StudentModel';
import styles from '../styles';

const LoginScreen: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');

    const onLogin = async () => {
        console.log("Login")
        const login: Login = {
            email: email,
            password: password
            //email: "asax@mail.com",
            //password: "123456"
        }
        try {
            console.log("Login: " + login.email)
            await StudentModel.login(login);
        } catch (err) {
            console.log(err)
        }
        StudentModel.debug()
        navigation.navigate('Home');
        //let editFlag = 0
        //if (email == "") {
        //    console.log("email can't be empty")
        //    alert("email can't be empty")
        //    return navigation.navigate('StudentList');
        //}
        //if (password == "") {
        //    console.log("password can't be empty")
        //    alert("password can't be empty")
        //    return navigation.navigate('StudentList');
        //}
        //if (route.params != undefined) {
        //    editFlag = route.params.id
        //    if ((id != editFlag.toString()) && await StudentModel.exists(id, "id")) {
        //        console.log("ID already exists")
        //        alert("ID already exists")
        //        return navigation.navigate('StudentList');
        //    }
        //    if ((email != route.params.email.toString()) && await StudentModel.exists(email, "email")) {
        //        console.log("email already exists")
        //        alert("email already exists")
        //        return navigation.navigate('StudentList');
        //    }
        //}
        //if (await StudentModel.exists(id, "id")) {
        //    console.log("ID already exists")
        //    alert("ID already exists")
        //    return navigation.navigate('StudentList');
        //}
        //else if (await StudentModel.exists(email, "email")) {
        //    console.log("email already exists")
        //    alert("email already exists")
        //    return navigation.navigate('StudentList');
        //}
        //if (route.params != undefined) {
        //    StudentModel.deleteStudent(route.params.id)
        //}
        
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
                <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText1}>Login</Text>
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
    title: {
        fontSize: 30,
        backgroundColor: 'white',
        fontWeight: "bold"
    },

    image: {
        alignSelf: "center",
        height: 400 ,
        width: 600

    }

});

export default LoginScreen;
