import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})
class APIClient<T>{
    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => axiosInstance.get<T[]>(this.endpoint).then(res => res.data)
    postItem = (item: T) => axiosInstance.post<T>(this.endpoint, item).then(res => res.data)
    delete = (id: number) => axiosInstance.delete(this.endpoint+"/"+id).then(res=>res.data)

}
export default APIClient