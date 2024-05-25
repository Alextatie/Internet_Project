import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button, TouchableHighlight,Alert} from 'react-native';
import React, { useState, FC } from 'react';
import styles from '../styles';
import StudentModel, { Student } from '../models/StudentModel';

const StudentListRow: FC<{
    name: string,
    id: string,
    email:string,
    avatar_url: string,
    onItemSelected: (id: string, email: string, name: string, avatar_url:string)=>void
}> = ({ name, id, avatar_url,email, onItemSelected }) => {
    const onClick = () => {
        onItemSelected(id, email, name, avatar_url);
    }
    const getImage = () => {
        return StudentModel.getCurrent().avatar_url
    }
    return (
        <TouchableHighlight onPress={onClick} underlayColor="white">
            <View style={styles.listrow}>
                {avatar_url == "" && <Image style={styles.avatar} source={require('../assets/thumbs-up-cat.gif')} />}
                {avatar_url != "" && <Image style={styles.avatar} source={{ uri: avatar_url }} />}
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text >
                    <Text style={styles.id}>{id}</Text>
                </View>
                </View>
        </TouchableHighlight>
    )
}

export default StudentListRow

