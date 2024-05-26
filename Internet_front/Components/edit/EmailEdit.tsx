//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import styles from '../../styles';
import ActivityIndicator from '../Lottie';


const EmailEdit: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    let [email, emailInput] = React.useState('');
    const [loading, setLoading] = useState(false)

    const onSave = async () => {
        try {
            if (email == "") {
                console.log("Cannot have empty fields")
                alert("Cannot have empty fields")
                return
                //return navigation.navigate('PreLogin');
            }
            else {
                setLoading(true)
                if ((await StudentModel.exists(email, "email") == true) && (email != StudentModel.getCurrent().email)) {
                    setLoading(false)
                    console.log("Email already exists")
                    alert("Email already exists")
                    return
                    //return navigation.navigate('PreLogin');
                }
            }
            setLoading(true)
            await StudentModel.Edit(email, "email")
            console.log("Editing " + StudentModel.getCurrent().id)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
        navigation.navigate('EditableProfile', {
            id: StudentModel.getCurrent().id,
            email: StudentModel.getCurrent().email,
            name: StudentModel.getCurrent().name
        });
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
                {StudentModel.getCurrent().avatar_url == "" && <Image style={styles.avatar2} source={require('../../assets/thumbs-up-cat.gif')} />}
                {StudentModel.getCurrent().avatar_url != "" && <Image style={styles.avatar2} source={{ uri: StudentModel.getCurrent().avatar_url }} />}
            <Text style={mystyles.title}>Old Email: {StudentModel.getCurrent().email}</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={emailInput}
                value={email}
                placeholder={"email"}
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
        backgroundColor: "white"
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

export default EmailEdit;
