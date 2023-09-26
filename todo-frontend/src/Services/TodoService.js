import axios from "axios"
import { getToken } from "./AuthService"

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export const getAllTodos = () => {
    return axios.get(BASE_REST_API_URL)
}

export const createTodo = (todo) => {
    return axios.post(BASE_REST_API_URL, todo);
}

export const getTodoById = (id) => {
    return axios.get(BASE_REST_API_URL + "/" + id);
}

export const updateTodoById = (id, todo) => {
    return axios.put(BASE_REST_API_URL + "/" + id, todo)
}

export const deleteTodoById = (id) => {
    return axios.delete(BASE_REST_API_URL + "/" + id)
}

export const completeTodoById = (id) => {
    return axios.patch(BASE_REST_API_URL + "/" + id + "/complete") 
}

export const inCompleteTodoById = (id) => {
    return axios.patch(BASE_REST_API_URL + "/" + id + "/inComplete") 
}