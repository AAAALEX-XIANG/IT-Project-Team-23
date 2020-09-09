import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:8080/api/account'
})

export const loginRequest = (userInfo) => {
    return service.post('/login', userInfo)
}