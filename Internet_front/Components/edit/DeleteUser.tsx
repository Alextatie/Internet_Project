//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import styles from '../../styles';
import ActivityIndicator from '../Lottie';

const DeleteUser: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    let [email, emailInput] = React.useState('');
    const [loading, setLoading] = useState(false)

    const onDelete= async () => {
        try {
            setLoading(true)
            await StudentModel.deleteAccount()
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
        setLoading(false)
        navigation.navigate('PreLogin')
    }
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }

    return (
        loading ?
            <ActivityIndicator visible={true} />
            :
        <View style={mystyles.container}>
            <Text style={{ color: "red", fontSize: 340, textAlign: "center" }}>!!!</Text>
            <Text style={{ color: "red", fontSize: 40, textAlign: "center", marginHorizontal: 40, marginBottom:80 }}>Are you sure you want to delete this account?</Text>
            <View style={styles.buttons3}>
                <TouchableOpacity style={styles.button5} onPress={onDelete}>
                    <Text style={styles.buttonText6}>Delete</Text>
                </TouchableOpacity>
                <View style={{ width:50}}></View>
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
        marginTop: 0,
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

export default DeleteUser;
