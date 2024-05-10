import {Text,FlatList,Button} from 'react-native';
import { FC, useState, useEffect } from "react";
import styles from '../styles';
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';

const StudentList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Student[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('Student Profile', { id: id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setData([...StudentModel.getAllStudents()])
            console.log("screen in focus")
        })
        return unsubscribe
    }, [navigation])


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('Add Student')}
                    title="Add"
                />
            ),
        })
    }, [])

    return (
        <FlatList
            style={styles.flatlist}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <StudentListRow
                    name={item.name}
                    id={item.id}
                    imgUrl={item.imgUrl}
                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

export default StudentList;