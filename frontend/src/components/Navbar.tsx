import { useGetUserByIdQuery } from "../store/query/usersApi"
import { FaChevronRight } from "react-icons/fa"
import { LuUser, LuUsers, LuUserPen, LuUserPlus } from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Navbar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [userId, setUserId] = useState<string | null>(null)
    const [isEditPage, setIsEditPage] = useState(false)
    const [isCreatePage, setIsCreatePage] = useState(false)
    
    useEffect(() => {
        const paths = pathname.split('/')
        const id = paths.length > 2 ? paths[2] : null
        setUserId(id)
        setIsEditPage(paths.includes('update'))
        setIsCreatePage(paths.includes('create'))
    }, [pathname])

    const { data: user, isLoading } = useGetUserByIdQuery(userId || '', {
        skip: !userId
    })

    const handleUsersClick = () => {
        navigate('/')
    }

    const handleUserClick = () => {
        if (userId) {
            navigate(`/user/${userId}`)
        }
    }

    const handleCreateClick = () => {
        navigate(`/user/create`)
    }

    const handleEditClick = () => {
        if (userId) {
            navigate(`/user/${userId}/update`)
        }
    }

    return (
        <nav className="fixed bg-[#131524] border border-[#4A516D] w-auto left-[140px] top-1 rounded-xl flex items-center p-2 text-white">
            <ul className="flex items-center gap-1">
                <li 
                    className="flex items-center gap-3 h-full p-2 rounded border border-transparent hover:border-[#4A516D] cursor-pointer transition-colors"
                    onClick={handleUsersClick}
                >
                    <LuUsers className="text-xl"/>
                    <p className="whitespace-nowrap">Пользователи</p>
                </li>

                {
                    isCreatePage && (
                        <>
                            <li className="text-gray-400 px-1">
                                <FaChevronRight size={12} />
                            </li>
                            <li 
                                className={`flex items-center gap-3 h-full p-2 rounded border border-transparent hover:border-[#4A516D] cursor-pointer transition-colors ${isLoading ? 'opacity-70' : ''}`}
                                onClick={handleCreateClick}
                            >
                                <LuUserPlus className="text-xl"/>
                                <p className="whitespace-nowrap">
                                    Добавление пользователя
                                </p>
                            </li>
                        </>
                    )
                }

                {
                    !isCreatePage && userId && (
                    <>
                        <li className="text-gray-400 px-1">
                            <FaChevronRight size={12} />
                        </li>
                        <li 
                            className={`flex items-center gap-3 h-full p-2 rounded border border-transparent hover:border-[#4A516D] cursor-pointer transition-colors ${isLoading ? 'opacity-70' : ''}`}
                            onClick={handleUserClick}
                        >
                            <LuUser className="text-xl"/>
                            <p className="whitespace-nowrap">
                                {isLoading ? 'Загрузка...' : user?.fullName || 'Неизвестный пользователь'}
                            </p>
                        </li>
                        {
                            isEditPage && (
                                <>
                                    <li className="text-gray-400 px-1">
                                        <FaChevronRight size={12} />
                                    </li>
                                    <li 
                                        className="flex items-center gap-3 h-full p-2 rounded border border-transparent hover:border-[#4A516D] cursor-pointer transition-colors"
                                        onClick={handleEditClick}
                                    >
                                        <LuUserPen className="text-xl"/>
                                        <p className="whitespace-nowrap">Редактирование</p>
                                    </li>
                                </>
                            )
                        }
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar