import { useContext, useMemo } from "react"
import { TableContext, type HeaderItem } from "./Table"

const Header = () => {

    const { headers } = useContext(TableContext)

    const _render = useMemo(() =>
        headers?.length  ? headers.map((item: HeaderItem, index: number) => (
            <th key={index} className={`py-4 text-sm font-normal ${item?.width}`}>
                {item.title}
            </th>
        )) : <></>,
        [headers]
    )

    return (
        <thead>
            <tr>{_render}</tr>
        </thead>
    )
}

export default Header
