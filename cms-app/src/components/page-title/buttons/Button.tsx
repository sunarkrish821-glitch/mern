import React from 'react';

export interface IButtonProps {
    className?: string,
    children: React.ReactNode,
    disabled?: boolean
}

export const SubmitButton = ({ 
    className = ' hover:bg-teal-800/90  bg-teal-800 ',
     children, 
     disabled }: Readonly<IButtonProps>) => {
    return (
        <button 
        className={`w-full text-white rounded-md cursor-pointer transition p-2 ${className}`}
        type="submit"
        disabled={disabled}
        >
            {children}
        </button>
    );
};




export const CancelButton = ({ className = '', children, disabled }: Readonly<IButtonProps>) => {
    return (
        <button 
        className={`w-full text-white rounded-md cursor-pointer transition hover:bg-red-800/90 p-2 bg-red-800 ${className}`}
        type="reset"
        disabled={disabled}
        >
            {children}
        </button>
    );
}