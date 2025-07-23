import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4001"

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000, // 5 segundos timeout para testar conexão rapidamente
})

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na API:', error);

        if (error.response?.status === 401) {
            // Token expirado ou inválido
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login"
        }

        return Promise.reject(error)
    },
)