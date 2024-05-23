//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity} from 'react-native';
import React, {  FC } from 'react';
import StudentModel, { Login } from '../models/StudentModel';
import styles from '../styles';

const LoginScreen: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');

    const onLogin = async () => {
        const login: Login = {
            email: email,
            password: password
        }
        let res
        try {
            res = await StudentModel.login(login);
        } catch (err) {
            console.log(err)
        }
        if (res.status == 400) {
            alert("Wrong email or password")
            console.log("Wrong email or password")
            //navigation.goBack()
        }
        else if (res.status == 200) {
            alert("Login: " + login.email)
            console.log("Login: " + login.email)
            navigation.navigate('Home');
        }
        
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
