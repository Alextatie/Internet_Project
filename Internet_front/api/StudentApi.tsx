import apiClient from "./ClientApi";
const getAllStudents = async () => {
    return apiClient.get('/student')
}
export default {
    getAllStudents
}