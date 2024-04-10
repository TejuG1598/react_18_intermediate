import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://grocerieseasy.net",

  // baseURL: 'https://jsonplaceholder.typicode.com'
});

export default apiClient;
