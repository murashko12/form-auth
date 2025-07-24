import type { InputHTMLAttributes } from 'react'
import { FiUser } from 'react-icons/fi'


interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    inputSearchStyles?: string
}

const InputLogin = ({ inputSearchStyles, ...attr }: IProps) => {
    return (
        <div className={`flex flex-col relative ${inputSearchStyles}`}>
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-[#F1F2FF]" />
            <input 
                {...attr}         
                className={`
                    pl-10
                    border border-[#4A516D] px-6 py-[10px] rounded-xl
                    outline-none hover:border-[#4A516D] focus:bg-[#131524]
                    text-base text-[#F1F2FF] placeholder:text-[#969696]
                `} 
            />
        </div>
    )
}

export default InputLogin
