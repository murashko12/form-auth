import { useCallback, useContext } from "react"
import { TableContext } from "./Table"
import Loader from "../Loader"

const Body = () => {
    const { items, isLoading, headers } = useContext(TableContext)

    const _renderRow = useCallback(
        (item: any, index: number) => {
            return (
                <tr
                    className="odd:bg-white-100 even:bg-white-500 h-12 hover:bg-[#4A516D] cursor-pointer"
                    key={index}
                >
                    {headers.map((column: any) => (
                        <td className="text-[14px] " key={column.key}>{item[column.key]}</td>
                    ))}
                </tr>
            )
        },
        [headers, items]
    )

    return (
        <tbody className="text-base font-normal w-full ">
            {items?.length && !isLoading ? (
                items.map((item, index) => _renderRow(item, index))
            ) : (
                <tr className="w-full">
                    <td colSpan={headers?.length} className="w-full">
                        <div className="flex justify-center w-full">
                            {isLoading ? <Loader /> : ""}
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
}

export default Body
