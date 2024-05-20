import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, TouchableHighlight,Alert} from 'react-native';
import React, { useState, FC } from 'react';
import styles from '../styles';


const PostListRow: FC<{
    sender: string,
    message: string,
    id: string
    onItemSelected: (message:string,sender:string,id:string)=>void
}> = ({ message,sender,id, onItemSelected }) => {
    const onClick = () => {
        onItemSelected(message,sender,id);
    }
    return (
        <TouchableHighlight onPress={onClick} underlayColor="white">
            <View style={styles.listrow}>
                {/*<Image style={styles.avatar} source={require(avatar_url)}/>*/}
                <Image style={styles.avatar} source={require("../assets/thumbs-up-cat.gif")} />
                <View style={styles.info}>
                    <Text style={styles.name}>{sender}</Text >
                    <Text style={styles.id}>{message}</Text>
                </View>
                </View>
        </TouchableHighlight>
    )
}

export default PostListRow

