import { Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { FC, useState, useEffect} from "react";
import styles from '../styles';
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';

const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const onLogout = async () => {
        console.log("Logout")
        StudentModel.logout()
        navigation.navigate('PreLogin');
    }
    const onStudents = async () => {
        console.log("StudentList")
        navigation.navigate('StudentList');
    }
    const onForum = async () => {
        console.log("ForumScreen")
        navigation.navigate('ForumScreen');
    }
    const onProfile = async () => {
        console.log("Profile")
        navigation.navigate('EditableProfile', {
            id: StudentModel.getCurrent().id,
            email: StudentModel.getCurrent().email,
            name: StudentModel.getCurrent().name
        });
    }

    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'space-between', marginTop:75
        }}>
            

                <View>
                    <Image source={require('../assets/home.png')} style={styles.image} />
                </View>
                <View style={styles.spacer2}>
                </View>
                <View style={styles.buttons2}>
                    <TouchableOpacity style={styles.button2} onPress={onStudents}>
                        <Text style={styles.buttonText3}>Students</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={onForum}>
                        <Text style={styles.buttonText3}>Forum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={onProfile}>
                        <Text style={styles.buttonText3}>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacer1}>
                </View>
                <TouchableOpacity style={styles.button2} onPress={onLogout}>
                    <Text style={styles.buttonText3}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.spacer1}>
            </View>

        </View>
    );
}

export default HomeScreen;