import { LuUsers } from "react-icons/lu"

const Navbar = () => {
    return (
        <nav className="fixed bg-[#131524] border border-[#4A516D] w-auto left-[140px] top-1 rounded-xl flex items-center p-2">
            <ul className="flex items-center">
                <li className="flex items-center gap-3 h-full p-2 rounded border border-[#131524] hover:border-[#4A516D] text-white cursor-pointer">
                    <LuUsers className="text-xl"/>
                    <p>Главное</p>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
