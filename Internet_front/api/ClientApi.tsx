import { create } from "apisauce";
const apiClient = create({
    headers: { Accept: 'application/vnd.github.v3+json' },
})
export default apiClient