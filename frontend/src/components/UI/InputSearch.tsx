import type { InputHTMLAttributes } from 'react'
import { IoSearch } from "react-icons/io5";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    inputSearchStyles?: string
    inputSearchInnerStyles?: string
}

const InputSearch = ({ inputSearchStyles, inputSearchInnerStyles, ...attr }: IProps) => {
    return (
        <div className={`flex flex-col relative ${inputSearchStyles}`}>
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-[#F1F2FF]" />
            <input 
                {...attr} 
                defaultValue={attr.value}
                className={`
                    pl-10
                    border border-[#4A516D]  
                    outline-none hover:border-[#4A516D] focus:bg-[#131524]
                    text-base 
                    ${inputSearchInnerStyles}
                `} 
            />
        </div>
    )
}

export default InputSearch
