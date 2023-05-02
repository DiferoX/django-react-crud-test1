import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = () => {
    //return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
    return tasksApi.get('/')
}

export const getTask = (id) => {
    return tasksApi.get(`/${id}/`)
}

export const createTask = (task) => {
    //return axios.post('http://localhost:8000/tasks/api/v1/tasks/', task)
    return tasksApi.post('/', task)
}

export const deleteTask = (id) => {
    return tasksApi.delete(`/${id}`)
}

export const updateTask = (id, task) => {
    return tasksApi.put(`/${id}/`, task)
}
