import { useParams, useNavigate } from "react-router-dom"
import { useGetUserByIdQuery, useDeleteUserMutation } from "../store/query/usersApi"
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPhone, FaEnvelope, FaUser, FaCalendarAlt, FaBriefcase } from "react-icons/fa"
import Loader from "../components/Loader"
import { useDateFormatter } from "../hooks/useDateFormatter"

const AdminUserPage = () => {
    
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: user, isLoading, error } = useGetUserByIdQuery(String(id))
    const [deleteUser] = useDeleteUserMutation()
    const { formatDateToDDMMYYYY } = useDateFormatter()

    const handleDelete = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            return
        }
        try {
            await deleteUser(String(id)).unwrap()
            navigate('/')
        } catch (err) {
            console.error('Ошибка при удалении пользователя:', err)
        }
    }

    const handleEdit = () => {
        navigate(`/admin/users/edit/${id}`)
    }

    if (isLoading) return <Loader />
    if (error) return <div className="text-red-500">Ошибка загрузки данных пользователя</div>
    if (!user) return <div className="text-white">Пользователь не найден</div>

    return (
        <div className="text-white p-6 max-w-4xl mx-auto">
            <div className="bg-[#131524] rounded-xl p-6 shadow-lg border border-[#4A516D]">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold">{user.fullName}</h1>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FaEdit /> Редактировать
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FaTrash /> Удалить
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Фамилия</p>
                                <p className="text-lg">{user.surName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaUser className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Имя</p>
                                <p className="text-lg">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-lg">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaPhone className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Телефон</p>
                                <p className="text-lg">{user.telephone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Дата рождения</p>
                                <p className="text-lg">{formatDateToDDMMYYYY(user.birthDate)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaBriefcase className="text-amber-300 text-xl" />
                            <div>
                                <p className="text-sm text-gray-400">Занятость</p>
                                <p className="text-lg">{user.employment}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-amber-300 text-xl w-5">
                                {user.userAgreement ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Согласие на обработку данных</p>
                                <p className="text-lg">
                                    {user.userAgreement ? "Да" : "Нет"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-amber-300 text-xl w-5">
                                <FaUser />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">ID</p>
                                <p className="text-lg font-mono">{user.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserPage