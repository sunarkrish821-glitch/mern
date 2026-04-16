import type React from "react";

interface IPageTitleProps {
  pageTitle: string,
  className?: string,
  children?: React.ReactNode,
  
}

export const PageTitle = ({ pageTitle, className = 'text-teal-900 text-center', children }: Readonly<IPageTitleProps>) => {

  return (
    <h1 className={`text-4xl font-semibold ${className}`}>
      { children ?? pageTitle}
    </h1>
  );
};