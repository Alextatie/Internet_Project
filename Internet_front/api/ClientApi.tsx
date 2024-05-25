import { create } from "apisauce";

const apiClient = create({
    baseURL: 'http://192.168.24.134:3000',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        accessToken: "",
        refreshToken: ""
    }
})
export default apiClient