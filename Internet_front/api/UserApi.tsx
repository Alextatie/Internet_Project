import apiClient from "./ClientApi";

let accessToken: any
let refreshToken: any

const setTokens = (access: any, refresh: any) => {
    accessToken = access
    refreshToken = refresh
    apiClient.setHeaders({
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}

const getAllStudents = async () => {
    return apiClient.get('/user')
}

const getStudent = async (id: string) => {
    return apiClient.get('/user/'+id)
}

const exists = async (id: string, type: string) => {
    if (type == "id") {
        return apiClient.get('/user?_id=' + id)
    }
    else {
        return apiClient.get('/user?email=' + id)
    }
}

const addStudent = async (studentJson:any) => {
    return apiClient.post('/auth/register',studentJson)
}

const EditStudent = async (id: string,studentJson: any) => {
    return apiClient.put('/user/' + id, studentJson)
}

const login = async (loginJson: any) => {
    return apiClient.post('/auth/login', loginJson)
}

const logout = async () => {
    return apiClient.get('/auth/logout')
}

const getAllPosts = async () => {
    return apiClient.get('/post')
}


export default {
    getAllStudents,
    addStudent,
    getStudent,
    exists,
    login,
    logout,
    getAllPosts,
    EditStudent,
    setTokens
}