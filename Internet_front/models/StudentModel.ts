import UserApi from "../api/UserApi"

export type Student = {
    name: string,
    id: string,
    email: string,
    password: string,
    avatar_url: string
}
export type Editable = {
    email: string,
    name: string,
    password: string

}

export type Login = {
    email: string,
    password: string

}

let currentUser: Student
let data = Array<Student>()

const getAllStudents = async () => {
    console.log("getAllStudents()")
    const res: any = await UserApi.getAllStudents()
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
        const student: any = await UserApi.exists(id, type)
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
        const res: any = await UserApi.getStudent(id)
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
        const res = UserApi.addStudent(data)
    } catch (err) {
        console.log(err)
    }
}

const login = async (Login: Login) => {
    const data = {
        email: Login.email,
        password: Login.password
    }

    try {
        const res:any = await UserApi.login(data)
        UserApi.setTokens(res.data.accessToken, res.data.refreshToken)
        const student: any = await UserApi.exists(Login.email, "email")
        currentUser = {
            id: student.data[0]._id,
            name: student.data[0].name,
            email: student.data[0].email,
            password: student.data[0].password,
            avatar_url: "temp"
        }
    } catch (err) {
        console.log(err)
    }
}

const debug = async () => {
    console.log(currentUser)
}

const logout = async () => {
    try {
        console.log("logout")
        await UserApi.logout()
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

const getCurrent = () => {
    return currentUser
}

const Edit = async (string: string, type: string) => {
    console.log("Edited: " + currentUser.id)
    let data
    switch (type) {
        case "name":
            data = {
                name: string,
                flag: 1
            }
            currentUser.name = string
            break;
        case "email":
            data = {
                email: string,
                flag: 2
            }
            currentUser.email = string
            break;
        case "password":
            data = {
                password: string,
                flag: 3
            }
            currentUser.password = string
            break;
    }
    UserApi.EditStudent(currentUser.id, data)
}


    export default { getAllStudents, getStudent, addStudent, deleteStudent, exists, login, logout,debug,getCurrent,Edit };