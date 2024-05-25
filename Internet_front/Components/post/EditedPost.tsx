//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student, Editable } from '../../models/StudentModel';
import PostModel, { Post } from '../../models/PostModel';
import styles from '../../styles';
import ActivityIndicator from '../Lottie';
import * as ImagePicker from 'expo-image-picker';

const EditedPost: FC<{ route?: any, navigation: any }> = ({ navigation, route }) => {
    let [message, messageInput] = React.useState('');
    const [loading, setLoading] = useState(false)
    const onPost = async () => {
        try {
            if (message == "") {
                console.log("Cannot send an empty post")
                alert("Cannot send an empty post")
            }
            else {
                setLoading(true)
                await PostModel.editPost(route.params.id, message,"1")
                setLoading(false)
                console.log("Editing post from:  " + StudentModel.getCurrent().id)
                return navigation.navigate('UserPosts');
            }
        } catch (err) {
            console.log(err)
        }

    }
    const onCamera = async () => {
        console.log("Open Camera")
        try {

            const res = await ImagePicker.launchCameraAsync()
            if (!res.canceled && res.assets.length > 0) {
                //console.log("id: " + route.params.id, route.params.sender, route.params.message, route.params.sender_avatar)
                await PostModel.editPost(route.params.id, res.assets[0].uri, "2")
                return navigation.navigate('UserPosts');
            }
        } catch (err) {
            console.log(err)
        }
        //navigation.navigate('NameEdit');
    }
    const onGallery = async () => {
        console.log("Open Gallery")
        try {

            const res = await ImagePicker.launchImageLibraryAsync()
            if (!res.canceled && res.assets.length > 0) {
                await PostModel.editPost(route.params.id, res.assets[0].uri, "2")
                return navigation.navigate('UserPosts');
            }
        } catch (err) {
            console.log(err)
        }
        //navigation.navigate('NameEdit');
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
            <Text style={mystyles.title}>{StudentModel.getCurrent().name}:</Text>
            <TextInput
                style={styles.textInput2}
                onChangeText={messageInput}
                value={message}
                placeholder={"Enter text:"}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onPost}>
                    <Text style={styles.buttonText1}>Post</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={onCamera}>
                            <Image style={mystyles.icon} source={require('../../assets/camera.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onGallery}>
                            <Image style={mystyles.icon} source={require('../../assets/gallery.png')} />
                        </TouchableOpacity>
                    </View>
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
    icon: {
        height: 36,
        width: 36
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

export default EditedPost;
