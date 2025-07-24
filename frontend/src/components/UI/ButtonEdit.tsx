import { FaEdit } from "react-icons/fa"

interface IProps {
    handleEdit: () => void
}

const ButtonEdit = ({handleEdit}: IProps) => {
    return (
        <button 
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
            <FaEdit /> Редактировать
        </button>
    )
}

export default ButtonEdit
