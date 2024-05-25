import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, TouchableHighlight,Alert} from 'react-native';
import React, { useState, FC } from 'react';
import styles from '../../styles';
import StudentModel from '../../models/StudentModel';


const PostListRow: FC<{
    id: string
    message: string,
    sender: string,
    sender_avatar: string,
    type: string
    onItemSelected: ( id:string,message: string, sender: string, sender_avatar:string,type:string)=>void
}> = ({ id, message, sender, sender_avatar, onItemSelected,type }) => {
    const onClick = () => {
        onItemSelected(id,message, sender, sender_avatar,type);
    }
    return (
        <TouchableHighlight onPress={onClick} underlayColor="white">
            <View style={styles.listrow}>
                {/*<Image style={styles.avatar} source={require(avatar_url)}/>*/}
                {sender_avatar == "x" && <Image style={styles.avatar} source={require('../../assets/thumbs-up-cat.gif')} />}
                {sender_avatar != "x" && <Image style={styles.avatar} source={{ uri: sender_avatar }} />}
                <View style={styles.info}>
                    <Text style={styles.name}>{sender}</Text >
                    {type == "1" && <Text style={styles.id}>{message}</Text>}
                    {type == "2" && <Image style={styles.avatar3} source={{ uri: message }} />}
                </View>
                </View>
        </TouchableHighlight>
    )
}

export default PostListRow

