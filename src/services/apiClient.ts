import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://grocerieseasy.net'
})
class APIClient<T>{
    endpoint: string

    constructor(endpoint: string){
        this.endpoint=endpoint;
    }

    getAll=()=>{
        return axiosInstance.get<T[]>(this.endpoint).then(res => res.data)
    }

    postItem=(item: T)=>{
        return axiosInstance.post<T>(this.endpoint, item).then(res => res.data)
    }
}
export default APIClient