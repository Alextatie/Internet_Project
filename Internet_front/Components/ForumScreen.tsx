import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';


const ForumScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('PostScreen')}
                    title="Post"
                />
            ),
        })
    }, [])
    const onBack = () => {
        console.log("Back")
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Forum"}</Text>
            <TouchableOpacity style={styles.button} onPress={onBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 280,
        marginHorizontal: 20

    },
    
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
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

export default ForumScreen;