import { createContext, type FC, type ReactNode } from "react"
import Header from "./Header"
import Body from "./Body"


export interface HeaderItem {
    key: string
    title: string | ReactNode
    sort: boolean
    width: string
}
  
interface IProps {
    children: ReactNode
    items: Array<unknown> | undefined
    headers: Array<HeaderItem | any> | any
    isLoading: boolean
}
  
interface SubComponents {
    Header?: typeof Header | any
    Body?: typeof Body
}
  
export const TableContext = createContext<Omit<IProps, "children">>({
    items: [],
    headers: [],
    isLoading: false
})

const Table: FC<IProps> & SubComponents = ({
    children,
    items,
    headers,
    isLoading
}) => {
    return (
        <div className="max-h-[500px] overflow-auto rounded-xl mt-5 bg-[#131524] border border-[#4A516D]">
            <table className="table table-xs table-pin-rows table-pin-cols text-center ">
                <TableContext.Provider value={{ items, headers, isLoading }}>
                    {children}
                </TableContext.Provider>
            </table>
            {!items || !items.length && <div className="border-[#4A516D] h-20 flex items-center justify-center">
                <p className="font-bold">Список пользователей пуст</p>
            </div>}
        </div>
    )
}

Table.Header = Header
Table.Body = Body

export default Table