import { useGetMeQuery } from "../store/query/authApi"
import { useGetUsersQuery } from "../store/query/usersApi"

const AdminPage = () => {
    const { data: users, isLoading, error } = useGetUsersQuery()
    const { data: myPage } = useGetMeQuery()
    console.log(myPage)
    console.log(users)
    
    return (
        <div className="text-white">
            AdminPage
        </div>
    )
}

export default AdminPage
