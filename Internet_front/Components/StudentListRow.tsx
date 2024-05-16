import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, TouchableHighlight,Alert} from 'react-native';
import React, { useState, FC } from 'react';
import styles from '../styles';


const StudentListRow: FC<{
    name: string,
    id: string,
    email:string,
    imgUrl: string,
    onItemSelected: (id:string,email:string,name:string)=>void
}> = ({ name, id, imgUrl,email, onItemSelected }) => {
    const onClick = () => {
        onItemSelected(id,email,name);
    }
    return (
        <TouchableHighlight onPress={onClick} underlayColor="white">
            <View style={styles.listrow}>
                {/*<Image style={styles.avatar} source={require(avatar_url)}/>*/}
                <Image style={styles.avatar} source={require("../assets/thumbs-up-cat.gif")} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text >
                    <Text style={styles.id}>{id}</Text>
                </View>
                </View>
        </TouchableHighlight>
    )
}

export default StudentListRow

