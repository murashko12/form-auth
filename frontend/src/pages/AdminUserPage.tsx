import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../store/query/usersApi"

const AdminUserPage = () => {
    const {id} = useParams()
    const {data: user, isLoading, error} = useGetUserByIdQuery(String(id))
    return (
        <div className="text-white">
            {JSON.stringify(user)}
        </div>
    )
}

export default AdminUserPage
