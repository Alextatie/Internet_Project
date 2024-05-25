import {Text,FlatList,Button, View} from 'react-native';
import { FC, useState, useEffect } from "react";
import styles from '../styles';
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';
import ActivityIndicator from './Lottie';

const StudentList: FC<{ navigation: any }> = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Student[]>([])
    const onItemSelected = (id: string, email: string, name: string, avatar_url: string) => {
        console.log('Item selected: ' + id + "\n" + email + "\n" + name + "\n" + avatar_url);
        navigation.navigate('StudentProfile', { id: id, email: email, name: name, avatar_url: avatar_url });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                setLoading(true)
                const students = await StudentModel.getAllStudents()
                setData(students)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [navigation])

    return (
        loading ?
            <ActivityIndicator visible={true} />
            :
            <FlatList
                style={styles.flatlist}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StudentListRow
                        name={item.name}
                        id={item.id}
                        email={item.email}
                        avatar_url={item.avatar_url}
                        onItemSelected={onItemSelected}
                    />
                )}
            />
    )
}

export default StudentList;