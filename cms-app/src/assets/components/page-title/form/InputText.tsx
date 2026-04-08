import type React from "react"

export interface IInputTextProps {
    type: React.HTMLInputTypeAttribute,
    name: string,
    placeholder?: string,
    className?: string
}



export const InputText = ({type, name, placeholder="Enter your Input........." className=''}: Readonly<IInputTextProps>) => {
    return{
         <input 
         className= { 'w-full border border-gray-200 p-2 rounded-md shadow ${className}'}
        type={type}
        name = {name}
        placeholder={ placeholder ?? 'Enter your ${name}......' } />
    };
}