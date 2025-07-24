import { FaTrash } from "react-icons/fa"

interface IProps {
    handleDelete: () => void
}

const ButtonDelete = ({handleDelete}: IProps) => {
    return (
        <button 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
            <FaTrash /> Удалить
        </button>
    )
}

export default ButtonDelete
