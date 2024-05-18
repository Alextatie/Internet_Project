import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';


const StudentProfile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: route.params.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('StudentEdit', { id: route.params.id })}
                    title="Edit"
                />
            ),
        })
    }, [])
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require('../assets/thumbs-up-cat.gif')} />
            <View style={styles.panel}>
                <Text style={styles.input2}>{"name:  " }</Text>
                <Text style={styles.input1}>{ route.params.name}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.input2}>{"id:  " }</Text>
                <Text style={styles.input1}>{+ route.params.id}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.input2}>{"email:  " }</Text>
                <Text style={styles.input1}>{ route.params.email}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 280,
        marginHorizontal:20

    },
    panel: {
        padding: 8,
        paddingLeft: 14,
        marginTop: StatusBar.currentHeight,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "gray",
        flex: 1,
        flexDirection: 'row'
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
        fontSize: 16,
        fontWeight: "bold"
    },
    input2: {
        fontWeight: "bold",
        color: "grey"
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

export default StudentProfile;