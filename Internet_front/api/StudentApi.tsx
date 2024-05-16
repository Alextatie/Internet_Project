import apiClient from "./ClientApi";
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


export default {
    getAllStudents,
    addStudent,
    getStudent,
    exists
}