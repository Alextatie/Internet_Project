//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import StudentModel, { Student } from '../models/StudentModel';
import styles from '../styles';
import ActivityIndicator from './Lottie';

const RegisterScreen: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [name, nameInput] = React.useState('');
    const [id, idInput] = React.useState('');
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');

    const onSave = async () => {
        console.log("Save")
        if ((id == "") || (name == "") || (email == "") || (password == "")) {
            console.log("Cannot have empty fields")
            alert("Cannot have empty fields")
            return
            //return navigation.navigate('PreLogin');
        }

        else {
            setLoading(true)
            if (await StudentModel.exists(id, "id") == true) {
                console.log("ID already exists " + id)
                alert("ID already exists")
                setLoading(false)
                return
            }
            if (await StudentModel.exists(email, "email") == true) {
                console.log("Email already exists")
                alert("Email already exists")
                setLoading(false)
                return
            }
        }

         {
            const student: Student = {
                name: name,
                id: id,
                avatar_url: "temp",
                email: email,
                password: password
            }
            try {
                setLoading(true)
                await StudentModel.addStudent(student);
                console.log("Register: " + student.id)
                alert("Account registered: " + student.id)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
            setLoading(false)
            navigation.navigate('Home');
        }
    }
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }

    return (
                loading ?
                    <ActivityIndicator visible={true} />
                    :
                    <View>
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
