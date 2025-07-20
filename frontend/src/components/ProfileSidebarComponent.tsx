import { useLogoutMutation } from "../store/query/authApi"
import { IoMdExit } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { LuUser } from "react-icons/lu"

type TProps = {
    openSidebar: boolean
}

const ProfileSidebarComponent = ({openSidebar}: TProps) => {
    
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout(undefined).unwrap()
            navigate('/login')
            toast.success('Вы успешно вышли из системы')
        } catch (err) {
            console.error('Ошибка при выходе:', err)
            toast.error('Не удалось выйти из системы')
            navigate('/login')
        }
    }

    return (
        <div className="flex gap-2 items-center min-w-[56px] border-t border-[#4A516D] pt-5 mt-5 mx-2 mb-2">
            
            <div className="w-12 h-12">
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                    <LuUser className="text-white text-2xl" />
                </div>
            </div>
            
            
            {openSidebar && (
                <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards] text-white flex justify-between items-center w-full">
                    <span>
                        <p className="">Мурашко П.</p>
                        <p className="text-xs">petr@ocumare.ru</p>
                    </span>
                    <button 
                        onClick={handleLogout}
                        className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards] text-white cursor-pointer hover:bg-[#4A516D] rounded w-[42px] h-[42px] flex items-center justify-center"
                    >
                        <IoMdExit className="text-2xl text-red-600"/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileSidebarComponent
