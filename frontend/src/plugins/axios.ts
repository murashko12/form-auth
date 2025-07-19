import axios from "axios";
import { toast } from "react-toastify";

export const authAxios = axios.create({
    baseURL: String(import.meta.env.BASE_URL),
    withCredentials: true   // в HTTP-запросах будут передаваться эти учетные данные, а также будет обрабатываться ответ с учетом политики "одного источника"
})

// Интерцептор для обработки ошибок
authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error('Сессия истекла. Пожалуйста, войдите снова.')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)