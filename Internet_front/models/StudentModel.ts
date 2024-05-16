import StudentApi from "../api/StudentApi"

export type Student = {
    name: string,
    id: string,
    email: string,
    password: string,
    avatar_url: string
}

let data = Array<Student>()

const getAllStudents = async () => {
    console.log("getAllStudents()")
    const res: any = await StudentApi.getAllStudents()
    let data = Array<Student>()
    if (res.data) {
        res.data.forEach((obj: any) => {
            const st: Student = {
                name: obj.name,
                id: obj._id,
                email: obj.email,
                password: obj.password,
                avatar_url: obj.avatar_url
            }
            data.push(st)
        });
    }
    return data
}

const exists = async (id: string, type: string) => {
    try {
        const student: any = await StudentApi.exists(id, type)
        if (Object.keys(student.data).length > 0) {
            return true
        }
        else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}


const getStudent = async (id: string): Promise<Student | undefined> => {
    try {
        const res: any = await StudentApi.getStudent(id)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const addStudent = (student: Student) => {
    const data = {
        _id: student.id,
        name: student.name,
        email: student.email,
        password: student.password
    }
    try {
        const res = StudentApi.addStudent(data)
    } catch (err) {
        console.log(err)
    }
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudent, addStudent, deleteStudent, exists };