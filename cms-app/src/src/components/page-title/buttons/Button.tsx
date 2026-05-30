import React from 'react';

export interface IButtonProps {
    className?: string,
    children: React.ReactNode,
    disabled?: boolean
}

export const SubmitButton = ({ 
    className = ' ',
     children, 
     disabled=false }: Readonly<IButtonProps>) => {
    return (
        <button 
        className={`w-full text-white rounded-md cursor-pointer transition p-2 hover:bg-teal-800/90  bg-teal-800 disabled:bg-teal-800/50 disabled:hover:bg-teal-800/40 disabled:cursor-not-allowed ${className}`}
        type="submit"
        disabled={disabled}
        >
            {children}
        </button>
    );
};




export const CancelButton = ({ className = '', children, disabled=false }: Readonly<IButtonProps>) => {
    return (
        <button 
        className={`w-full text-white rounded-md cursor-pointer transition hover:bg-red-800/90 p-2 bg-red-800 disabled:bg-red-800/50 disabled:hover:bg-red-800/40 disabled:cursor-not-allowed ${className}`}
        type="reset"
        disabled={disabled}
        >
            {children}
        </button>
    );
}