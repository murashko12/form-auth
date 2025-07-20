import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaSave, FaTimes } from "react-icons/fa"
import Loader from "../components/Loader"
import { useEffect } from "react"
import { useGetUserByIdQuery, useUpdateUserMutation } from "../store/query/usersApi"

interface UserFormData {
    name: string
    surName: string
    fullName?: string
    birthDate: string
    telephone: string
    employment?: string
    userAgreement: boolean
}

const AdminUserUpdatePage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(id || "")

    const { register, handleSubmit, watch, setValue, reset } = useForm<UserFormData>()

    const name = watch("name")
    const surName = watch("surName")

    useEffect(() => {
        if (name && surName) {
            setValue("fullName", `${surName} ${name}`)
        }
    }, [name, surName, setValue])

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                surName: user.surName,
                fullName: user.fullName,
                birthDate: user.birthDate,
                telephone: user.telephone,
                employment: user.employment,
                userAgreement: user.userAgreement
            })
        }
    }, [user, reset])

    const onSubmit = async (data: UserFormData) => {
        try {
            if (id) {
                const formattedData = {
                    name: data.name,
                    surName: data.surName,
                    fullName: `${data.surName} ${data.name}`,
                    birthDate: new Date(data.birthDate).toISOString(),
                    telephone: data.telephone,
                    employment: data.employment,
                    userAgreement: data.userAgreement
                }
                await updateUser({
                    id,
                    changes: formattedData
                }).unwrap()
                navigate(-1)
            }
        } catch (err) {
            console.error("Ошибка при обновлении пользователя:", err)
        }
    }

    if (isUserLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        )
    }

    return (
        <div className="text-white p-6 max-w-4xl mx-auto">
            <div className="bg-[#131524] rounded-xl p-6 shadow-lg border border-[#4A516D]">
                <h1 className="text-2xl font-bold mb-6">Редактирование пользователя</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Фамилия */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Фамилия</label>
                            <input
                                {...register("surName", { required: true })}
                                className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                            />
                        </div>

                        {/* Имя */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Имя</label>
                            <input
                                {...register("name", { required: true })}
                                className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none"
                            />
                        </div>

                        {/* Полное имя (автозаполнение) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Полное имя</label>
                            <input
                                {...register("fullName")}
                                readOnly
                                className="w-full bg-[#1E2136] rounded-lg px-4 py-2 border border-[#4A516D] outline-none cursor-not-allowed opacity-70"
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
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4A516D] hover:bg-[#4A516D] transition-colors"
                        >
                            <FaTimes /> Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-300 text-[#131524] hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? <Loader /> : <FaSave />} Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminUserUpdatePage