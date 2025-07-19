import { useState, type InputHTMLAttributes } from 'react'
import { IoKeyOutline } from 'react-icons/io5'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    inputSearchStyles?: string
}

const InputPassword = ({ inputSearchStyles, ...attr }: IProps) => {

    const [passwordType, setPasswordType] = useState<boolean>()

    const handleChangeType = () => setPasswordType(!passwordType)

    return (
        <div className={`flex flex-col relative ${inputSearchStyles}`}>        
            <IoKeyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-[#F1F2FF]" />
            <input 
                {...attr} 
                // type={passwordType ? "password" : "text"}
                className={`
                    pl-10
                    border border-[#4A516D] px-6 py-[10px] rounded-xl
                    outline-none hover:border-[#4A516D] focus:bg-[#131524]
                    text-base text-[#F1F2FF] placeholder:text-[#969696] 
                `}
                autoComplete="new-password"
            />
            <button 
                onClick={handleChangeType}
                className="absolute flex items-center justify-center right-2 top-1/2 transform -translate-y-1/2 text-xl text-[#F1F2FF] hover:bg-[#4A516D] w-7 h-7 rounded cursor-pointer"
            >{passwordType ? <FaRegEyeSlash /> : <FaRegEye />}</button>
        </div>
    )
}

export default InputPassword