import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface IProps {
    mode: 'create' | 'edit'
}

const ButtonCancel = ({ mode }: IProps) => {
    const navigate = useNavigate()

    return (
        <button
            type="button"
            onClick={() => mode === 'create' ? navigate("/") : navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4A516D] hover:bg-[#4A516D] transition-colors"
        >
            <FaTimes /> Отмена
        </button>
    )
}

export default ButtonCancel