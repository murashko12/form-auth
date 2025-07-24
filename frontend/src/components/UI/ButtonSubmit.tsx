import { FaSave } from "react-icons/fa"
import Loader from "./Loader"

interface IProps {
  isLoading: boolean
  mode: 'create' | 'edit'
}

const ButtonSubmit = ({ isLoading, mode }: IProps) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-300 text-[#131524] hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? <Loader /> : <FaSave />} 
            {mode === 'create' ? 'Создать пользователя' : 'Сохранить изменения'}
        </button>
    )
}

export default ButtonSubmit