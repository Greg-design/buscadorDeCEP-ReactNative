import axios from "axios"; //para usar api

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

export default api