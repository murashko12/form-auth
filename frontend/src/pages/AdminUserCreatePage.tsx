import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useCreateUserMutation } from "../store/query/usersApi"
import { FaSave, FaTimes } from "react-icons/fa"
import Loader from "../components/Loader"
import { useEffect } from "react"

interface UserFormData {
    name: string
    surName: string
    fullName?: string
    password: string
    email: string
    birthDate: string
    telephone: string
    employment?: string
    userAgreement: boolean
}

const AdminUserCreatePage = () => {
    const navigate = useNavigate()
    const [createUser, { isLoading }] = useCreateUserMutation()

    const { register, handleSubmit, watch, setValue, reset } = useForm<UserFormData>({
        defaultValues: {
            fullName: ""
        }
    })

    const name = watch("name")
    const surName = watch("surName")

    useEffect(() => {
        if (name && surName) {
            setValue("fullName", `${surName} ${name}`);
        }
    }, [name, surName, setValue])

    const onSubmit = async (data: UserFormData) => {
        try {
            await createUser(data).unwrap()
            reset()
            navigate("/")
        } catch (err) {
            console.error("Ошибка при создании пользователя:", err)
        }
    }

    return (
        <div className="text-white p-6 max-w-4xl mx-auto">
            <div className="bg-[#131524] rounded-xl p-6 shadow-lg border border-[#4A516D]">
            <h1 className="text-2xl font-bold mb-6">Создание нового пользователя</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Фамилия */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Фамилия</label>
                        <input
                            {...register("surName")}
                            className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                        />
                    </div>

                    {/* Имя */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Имя</label>
                        <input
                            {...register("name")}
                            className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                        />
                    </div>

                    {/* Пароль */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Пароль</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                        />
                    </div>

                    {/* Телефон */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Телефон</label>
                        <input
                            {...register("telephone")}
                            className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                        />
                    </div>

                        {/* Дата рождения */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Дата рождения</label>
                            <input
                                type="datetime-local"
                                {...register("birthDate")}
                                className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                            />
                        </div>

                        {/* Занятость */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Занятость</label>
                            <input
                                {...register("employment")}
                                className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                            />
                        </div>

                        {/* Согласие */}
                        <div className="flex items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    {...register("userAgreement")}
                                    className="form-checkbox h-5 w-5 text-amber-300 rounded bg-[#1E2136] border-[#4A516D] outline-none"
                                />
                                <span className="text-sm text-gray-400">Согласие на обработку данных</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4A516D] hover:bg-[#4A516D] transition-colors"
                        >
                            <FaTimes /> Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-300 text-[#131524] hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader /> : <FaSave />} Создать пользователя
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminUserCreatePage