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
        return axiosInstance.get(this.endpoint).then(res => res.data)
    }

    postItem=(item: T)=>{
        return axiosInstance.post(this.endpoint, item).then(res => res.data)
    }
}
export default APIClient