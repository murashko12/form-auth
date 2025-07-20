import { useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { TableContext } from "../Table"
import type { User } from "../../../store/types/auth"
import { FaRegCheckCircle } from "react-icons/fa"
import { FaRegCircleXmark } from "react-icons/fa6"
import { useDateFormatter } from "../../../hooks/useDateFormatter"

const UsersBody = () => {
  const navigate = useNavigate();
  const { items, headers } = useContext(TableContext);
  const { formatDateToDDMMYYYY } = useDateFormatter()
  const renderUserRow = useMemo(() => {
    return (items as User[])?.map((user, index) => (
      <tr
        onClick={() => navigate(`/user/${user.id}`)}
        className="hover:bg-[#4A516D] cursor-pointer h-12"
        key={index}
      >
        {headers.map((column: any) => {
          let cellContent 

          switch (column.key) {
            case 'userAgreement':
              cellContent = user[column.key as keyof User] 
                ? <FaRegCheckCircle className="text-2xl text-green-500 mx-auto" /> 
                : <FaRegCircleXmark className="text-2xl text-red-500 mx-auto" />
              break
            case 'birthDate':
              cellContent = formatDateToDDMMYYYY(user[column.key as keyof User])
              break
            default:
              cellContent = user[column.key as keyof User]
          }
          return <td className="text-beige-600 text-base font-normal" key={column.key}>
            {cellContent}
          </td>
        })}
      </tr>
    )) || []
  }, [items, headers, navigate])
  return <tbody>{renderUserRow}</tbody>
}

export default UsersBody