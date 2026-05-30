import React from "react";

export interface IFormLabelProps {
    htmlFor?: string,
    className?: string,
    children: React.ReactNode
}
export const FormLabel = ({ htmlFor, className="w-1/3", children }: Readonly<IFormLabelProps>) => {
    return (
        <label className={ `font-semibold text-lg ${className}` } htmlFor={htmlFor}>
            {children}
        </label>
    );
}