import { Text, FlatList, View, Button, Image } from 'react-native';
import { FC, useState, useEffect} from "react";
import styles from '../styles';
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';

const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center'
        }}>
            <View>
                <Image source={require('../assets/Home.png')} style={styles.image} />
            </View>
            <Button
                title="Students"
                onPress={() => navigation.navigate("StudentList")}
            />
            <Button
                title="Forum"
                onPress={() => navigation.navigate("ForumScreen")}
            />
            <Button
                title="Profile"
            />

        </View>
    );
}

export default HomeScreen;