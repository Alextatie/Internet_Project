import StudentApi from "../api/StudentApi"

export type Student = {
    name: string,
    id: string,
    avatar_url: string
}

const data: Student[] = [
   
]

const getAllStudents = async () => {
    let Data
    try {
        Data = await StudentApi.getAllStudents();
    } catch (err) {
        console.log(err)
    }
    return Data
}

const exists = (id: any) => {
    const index = data.findIndex((student) => student.id === id);
    console.log("Id: "+id+", Index: "+index)
    if (index >= 0) {
        return true
    }
    else {
        return false
    }
}

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id == id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudent, addStudent, deleteStudent,exists };