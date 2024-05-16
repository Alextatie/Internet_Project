import {Text,FlatList,Button} from 'react-native';
import { FC, useState, useEffect } from "react";
import styles from '../styles';
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';

const StudentList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Student[]>([])
    const onItemSelected =  (id: string,email:string,name:string) => {
        console.log('Item selected: ' + id);
        //const student: any = await StudentModel.getStudent(id);
        //const name = student.name
        //const nid = student.id
        //const email = student.email
        navigation.navigate('Student Profile', { id: id, email: email, name: name });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const students = await StudentModel.getAllStudents()
                setData(students)
                console.log("screen in focus")
            } catch (err) {
                console.log(err)

            }
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
                    email={item.email}
                    imgUrl={item.avatar_url}
                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

export default StudentList;