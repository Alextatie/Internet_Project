import UserApi from "../api/UserApi"

export type Post = {
    id: string,
    message: string,
    sender: string
}

let data = Array<Post>()

const getAllPosts = async () => {
    console.log("getAllPosts()")
    const res: any = await UserApi.getAllPosts()
    let data = Array<Post>()
    if (res.data) {
        res.data.forEach((obj: any) => {
            const st: Post = {
                id: obj._id,
                message: obj.message,
                sender: obj.sender
            }
            data.push(st)
        });
    }
    return data
}

//const exists = async (id: string, type: string) => {
//    try {
//        const student: any = await StudentApi.exists(id, type)
//        if (Object.keys(student.data).length > 0) {
//            return true
//        }
//        else {
//            return false
//        }
//    } catch (err) {
//        console.log(err)
//    }
//}


//const getStudent = async (id: string): Promise<Student | undefined> => {
//    try {
//        const res: any = await StudentApi.getStudent(id)
//        return res.data
//    } catch (err) {
//        console.log(err)
//    }
//}

//const addStudent = (student: Student) => {
//    const data = {
//        _id: student.id,
//        name: student.name,
//        email: student.email,
//        password: student.password
//    }
//    try {
//        const res = StudentApi.addStudent(data)
//    } catch (err) {
//        console.log(err)
//    }
//}

//const deleteStudent = (id: string) => {
//    const index = data.findIndex((student) => student.id === id);
//    if (index !== -1) {
//        data.splice(index, 1);
//    }
//}

export default { getAllPosts/*, getStudent, addStudent, deleteStudent, exists*/ };