import Table from "../components/Table/Table"
import InputSearch from "../components/InputSearch"
import { useGetMeQuery } from "../store/query/authApi"
import { useGetUsersQuery } from "../store/query/usersApi"
import Header from "../components/Table/Header"

import UsersBody from "../components/Table/UsersTable/UsersBody"
import type { User } from "@/store/types/auth"

const AdminPage = () => {
    const { data: users, isLoading, error } = useGetUsersQuery()
    const { data: myPage } = useGetMeQuery()
    console.log(myPage)
    console.log(users)
    
    const defaultHeader = [
        {
            key: "surName",
            title: "Фамилия",
            width: 'w-[10%]',
            sort: true
        }, {
            key: "name",
            title: "Имя",
            width: 'w-[10%]',
            sort: true
        }, {
            key: "email",
            title: "Логин",
            width: 'w-[20%]',
            sort: true,
        }, {
            key: "birthDate",
            title: "Дата рождения",
            width: 'w-[25%]',
            sort: true
        }, {
            key: "telephone",
            title: "Телефон",
            width: 'w-[20%]',
            sort: true
        }, {
            key: "userAgreement",
            title: "Пользовательское соглашение",
            width: 'w-[15%]',
            sort: true
        }
    ]

    return (
        <div className="text-white">
            <InputSearch placeholder="Поиск проекта" inputSearchStyles={"w-1/3"} inputSearchInnerStyles={"rounded-xl h-12"} />
            <Table items={users?.filter((user: User) => user.id !== myPage?.sub)} headers={defaultHeader} isLoading={false}>
                <Header />
                <UsersBody />
            </Table>
        </div>
    )
}

export default AdminPage
