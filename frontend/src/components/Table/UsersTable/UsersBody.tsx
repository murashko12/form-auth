import { useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { TableContext } from "../Table"
import type { User } from "../../../store/types/auth"

const UsersBody = () => {
  const navigate = useNavigate();
  const { items, headers } = useContext(TableContext);

  const renderUserRow = useMemo(() => {
    return (items as User[])?.map((user, index) => (
      <tr
        onClick={() => navigate(`/user/${user.id}`)}
        className="hover:bg-[#4A516D] cursor-pointer h-12"
        key={index}
      >
        {headers.map((column: any) => {

          

          return <td className="text-beige-600 text-base font-normal" key={column.key}>
            {user[column.key as keyof User]}
          </td>
  })}
      </tr>
    )) || []
  }, [items, headers, navigate])
  return <tbody>{renderUserRow}</tbody>
}

export default UsersBody