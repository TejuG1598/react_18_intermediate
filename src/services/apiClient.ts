import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://grocerieseasy.net",
});

export default apiClient;
