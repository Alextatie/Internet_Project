import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../models/StudentModel';
import PostModel, { Post } from '../models/PostModel';
import styles from '../styles';
import ActivityIndicator from './Lottie';
import * as ImagePicker from 'expo-image-picker';

const EditableProfile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false)
    const requestPermission = async () => {
        try {
            const res = await ImagePicker.requestCameraPermissionsAsync()
            if (!res.granted) {
                alert("You need to allow camera permission.")
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        requestPermission()
    },[])

    const onName = async () => {
        console.log("Edit Name")
        navigation.navigate('NameEdit');
    }
    const onEmail = async () => {
        console.log("Edit Email")
        navigation.navigate('EmailEdit');
    }
    const onPassword = async () => {
        console.log("Edit Password")
        navigation.navigate('PasswordEdit');
    }
    const onCamera = async () => {
        console.log("Open Camera")
        try {

            const res = await ImagePicker.launchCameraAsync()
            setLoading(true)
            if (!res.canceled && res.assets.length > 0) {

                await StudentModel.Edit(res.assets[0].uri, "avatar")
                //await PostModel.updateAvatar()
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
        navigation.navigate('EditableProfile', {
            id: StudentModel.getCurrent().id,
            email: StudentModel.getCurrent().email,
            name: StudentModel.getCurrent().name
        });
    }
    const onGallery = async () => {
        console.log("Open Gallery")
        try {

            const res = await ImagePicker.launchImageLibraryAsync()
            if (!res.canceled && res.assets.length > 0) {

                await StudentModel.Edit(res.assets[0].uri, "avatar")
                //await PostModel.updateAvatar()
            }
        } catch (err) {
            console.log(err)
        }
        navigation.navigate('EditableProfile', {
            id: StudentModel.getCurrent().id,
            email: StudentModel.getCurrent().email,
            name: StudentModel.getCurrent().name
        });
    }
    const onDelete = async () => {
        console.log("Delete User")
        navigation.navigate('DeleteUser');
    }
    const onPosts = async () => {
        console.log("User Posts")
        navigation.navigate('UserPosts');
    }

    return (
        <View style={mystyles.container}>
            <View style={mystyles.row}>
                {StudentModel.getCurrent().avatar_url == "" && <Image style={styles.avatar2} source={require('../assets/thumbs-up-cat.gif')} />}
                {StudentModel.getCurrent().avatar_url != "" && <Image style={styles.avatar2} source={{ uri: StudentModel.getCurrent().avatar_url }} />}
                <View>
                <TouchableOpacity  onPress={onCamera}>
                        <Image style={mystyles.icon} source={require('../assets/camera.png')} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={onGallery}>
                        <Image style={mystyles.icon} source={require('../assets/gallery.png')} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"name:  " }</Text>
                    <Text style={mystyles.input1}>{route.params.name}</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onName}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"Password:  "}</Text>
                    <Text style={mystyles.input1}>*********</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onPassword}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"Email:  "}</Text>
                    <Text style={mystyles.input1}>{route.params.email}</Text>
                </View>
                <TouchableOpacity style={styles.button3} onPress={onEmail}>
                    <Text style={styles.buttonText4}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
                <View style={mystyles.panel}>
                    <Text style={mystyles.input2}>{"ID:  "}</Text>
                    <Text style={mystyles.input1}>{route.params.id}</Text>
                </View>
                <TouchableOpacity style={styles.button4} onPress={onDelete}>
                    <Text style={styles.buttonText4}>DLT</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyles.row}>
            <TouchableOpacity style={styles.button} onPress={onPosts}>
                <Text style={styles.buttonText1}>Posts</Text>
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
        marginBottom: 240,
        marginHorizontal: 20,
        justifyContent: "space-between"

    },
    row: {
        paddingTop: 3,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: "center",
        
  
    },
    panel: {
        height: 64,
        paddingLeft: 7,
        borderWidth: 3,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'column',
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
    },
   icon: {
       height: 36,
       width: 36
    }

});

export default EditableProfile;