import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';
import styles from '../styles';

const EditableProfile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const onName = async () => {
        console.log("Edit Name")
        navigation.navigate('StudentEdit');
    }
    const onEmail = async () => {
        console.log("Edit Email")
        navigation.navigate('StudentEdit');
    }
    const onPassword = async () => {
        console.log("Edit Password")
        navigation.navigate('StudentEdit');
    }
    const onAvatar = async () => {
        console.log("Edit Avatar")
        //navigation.navigate('StudentEdit');
    }

    return (
        <View style={mystyles.container}>
            <Image style={mystyles.avatar} source={require('../assets/thumbs-up-cat.gif')} />
            <View style={mystyles.panel}>
                <View>
                <Text style={mystyles.input2}>{"name:  " }</Text>
                    <Text style={mystyles.input1}>{route.params.name}</Text>
                </View>
            </View>
            <View style={mystyles.panel}>
            <View>
                <Text style={mystyles.input2}>{"id:  " }</Text>
                    <Text style={mystyles.input1}>{+ route.params.id}</Text>
                </View>
            </View>
                <View style={mystyles.panel}>
                    <View>
                <Text style={mystyles.input2}>{"email:  " }</Text>
                        <Text style={mystyles.input1}>{route.params.email}</Text>
                </View>
                
            </View >
            <View style={{ alignItems: "center", paddingTop:50}}>
            <TouchableOpacity style={styles.button} onPress={onName}>
                <Text style={styles.buttonText4}>Change Name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onEmail}>
                    <Text style={styles.buttonText4}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPassword}>
                    <Text style={styles.buttonText5}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onAvatar}>
                    <Text style={styles.buttonText4}>Change Avatar</Text>
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
        marginBottom: 80,
        marginHorizontal: 20,
        justifyContent: "space-between"

    },
    panel: {
        paddingLeft: 7,
        paddingTop:3,
        marginTop: StatusBar.currentHeight,
        borderWidth: 3,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
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