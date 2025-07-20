import { type ReactNode, useMemo, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import ProfileSidebarComponent from "./ProfileSidebarComponent"
import { LuUserPlus } from "react-icons/lu"

interface IProps {
    icon: ReactNode
    label: string
    path: string
    openSidebar: boolean
}

const Sidebar = () => {

    const [open, setOpen] = useState<boolean>(false)

    const projectLinks = useMemo(() => [
        { id: 1, icon: <LuUserPlus className="text-white text-2xl " />, label: "Добавить пользователя", path: "/user/create" }
    ], [])

    

    const SidebarLinkItem = ({icon, label, path, openSidebar}: IProps) => {
        return (
            <Link className={`w-full h-[42px] flex gap-3 flex-shrink-0 items-center justify-center  hover:bg-[#4A516D]`} to={`${path}`}>
                {icon}
                {openSidebar && (
                    <p className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards] text-white">
                        {label}
                    </p>
                )}
            </Link>
        )
    }

    return (
        <>
            <button 
                onClick={() => setOpen(!open)}
                className={`
                    fixed w-8 h-8 top-[74px] bg-[#1C2035] 
                    ${open ? "left-[280px]" : "left-[60px]"} 
                    border border-[#4A516D] rounded-full z-40
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out
                `}
            >
                {open ? (
                    <FaChevronLeft className="text-white" />
                ) : (
                    <FaChevronRight className="text-white" />
                )}
            </button>

            <aside
                className={`
                    fixed top-0 left-0 bottom-0 p-1 
                    ${open ? "w-[300px]" : "w-[80px]"} 
                    transition-all duration-300 ease-in-out overflow-hidden
                    z-30
                `}
            >
                <div className="h-full relative">
                    <div className="bg-[#131524] border border-[#4A516D] h-full rounded-xl flex flex-col justify-between">
                        <div className="flex flex-col justify-between mt-2 mx-2">
                            <button className="flex items-center min-w-[56px] gap-8">
                                <div className="bg-amber-300 w-[56px] h-[56px] rounded flex-shrink-0" />
                                {open && (
                                    <p className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards] text-white font-extrabold">
                                        USER ADMIN
                                    </p>
                                )}
                            </button>
                            <div className="border-t border-[#4A516D] pt-5 mt-5">
                            
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3"> 
                            {projectLinks.map((item) => (
                                <SidebarLinkItem 
                                    key={item.id}
                                    icon={item.icon} 
                                    label={item.label} 
                                    path={item.path} 
                                    openSidebar={open} 
                                />
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            <ProfileSidebarComponent openSidebar={open} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar