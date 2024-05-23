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
const debug = () => {
    console.log(accessToken)
    console.log(refreshToken)
}

const getAllStudents = async () => {
    return apiClient.get('/user')
}

const getAllPosts = async (id: string) => {
    return apiClient.get('/post?sender=' + id)
}

const getStudent = async (id: string) => {
    return apiClient.get('/user?email=' + id)
}

const exists = (id: string, type: string) => {
    if (type == "id") {
        return apiClient.get('/user/check?_id=' + id)

    }
    else {
        return apiClient.get('/user/check?email=' + id)
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

const refresh = async () => {
    return apiClient.get('/auth/refresh')
}

const deleteAccount = async (id:string) => {
    return apiClient.delete('/user/' + id)
}

const postPost = async (postJson: any) => {
    return apiClient.post('/post/', postJson)
}

const deletePost = async (id: string) => {
    return apiClient.delete('/post/' + id)
}
const editPost = async (id: string,postJson:any) => {
    return apiClient.put('/post/' + id, postJson)
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
    setTokens,
    refresh,
    debug,
    deleteAccount,
    postPost,
    deletePost,
    editPost
}