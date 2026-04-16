// import type { BaseSyntheticEvent } from "react";
import type React from "react"
import { Controller, useController, type Control, type FieldValues, type Path } from "react-hook-form";


export interface IInputTextProps<T extends FieldValues> {
    type: React.HTMLInputTypeAttribute,
    name: Path<T>,
    placeholder?: string | null,
    className?: string
    // onChange: (e: BaseSyntheticEvent) => void
    control: Control<T>,
    errMsg?: string | null
}



export const InputText = <T extends FieldValues>({type, name, placeholder=null, className='', control, errMsg=""}: Readonly<IInputTextProps<T>>) => {
    return (
         
            <Controller
            name={name}
            control={control}
            render={({ field }) => {
                 return (
                <><input 
                className= { `w-full border border-gray-200 rounded-md p-2 ${className}` }
                type={type}
                placeholder={placeholder ?? `Enter your ${name}.....` }
                {...field}
                 />
                 <span className="text-red-700 italic text-sm">{errMsg}</span>
                 </>
            )
            }}
         />
    );
}




export const InputTextHook = <T extends FieldValues>({type, name, placeholder=null, className='', control, errMsg=""}: Readonly<IInputTextProps<T>>) => {
   
   const {field} = useController({
    name: name,
    control: control,
   })
    return (
                <><input 
                className= { `w-full border border-gray-200 rounded-md p-2 ${className}` }
                type={type}
                placeholder={placeholder ?? `Enter your ${name}.....` }
                {...field}
                 />
                 <span className="text-red-700 italic text-sm">{errMsg}</span>
                 </>
    );
}