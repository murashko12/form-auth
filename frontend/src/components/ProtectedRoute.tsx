import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetMeQuery } from '../store/query/authApi'
import { toast } from 'react-toastify'

const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useGetMeQuery(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoading) return
        
        if (isError) {
            toast.error('Ошибка авторизации')
            navigate('/login')
            return
        }

        if (!user) {
            toast.error('Требуется авторизация')
            navigate('/login')
        }
    }, [user, isLoading, isError, navigate])

    if (isLoading) return <div>Проверка авторизации...</div>

    return <Outlet />
}

export default ProtectedRoute