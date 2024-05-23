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
    let res: any = await UserApi.getAllStudents()
    console.log(res.status)
    if (res.status == 403) {
        await refresh()
        res = await UserApi.getAllStudents()
    }
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
    console.log(data.length+" students loaded")
    return data
}

const exists = async (id: string, type: string) => {
    try {
        const exists: any = await UserApi.exists(id, type)
        console.log(exists.data)
        return exists.data
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

const addStudent = async (student: Student) => {
    const data = {
        _id: student.id,
        name: student.name,
        email: student.email,
        password: student.password
    }
    const newlogin = {
        email: student.email,
        password: student.password

    }
    try {
        const res = await UserApi.addStudent(data)
        await login(newlogin)
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
        const student: any = await UserApi.getStudent(Login.email)
        currentUser = {
            id: student.data[0]._id,
            name: student.data[0].name,
            email: student.data[0].email,
            password: student.data[0].password,
            avatar_url: "temp"
        }
        return res
    } catch (err) {
        console.log(err)
    }
}

const refresh = async () => {
    const newTokens: any = await UserApi.refresh()
    UserApi.setTokens(newTokens.data.accessToken, newTokens.data.refreshToken)
    UserApi.debug()
}


const debug = async () => {
    console.log(currentUser)
}

const logout = async () => {
    try {
        await refresh()
        console.log("Logout")
        await UserApi.logout()
    } catch (err) {
        console.log(err)
    }
}

const deleteAccount = async () => {
    try {
        await refresh()
        console.log("Delete Account")
        await UserApi.deleteAccount(currentUser.id)
    } catch (err) {
        console.log(err)
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


    export default { getAllStudents, getStudent, addStudent, exists, login, logout,debug,getCurrent,Edit,refresh,deleteAccount};