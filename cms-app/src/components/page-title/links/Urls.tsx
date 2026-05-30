import React from "react";

interface IRedirectLinkProps {
    className?: string,
    href?: string,
    children: React.ReactNode,
}


export const RedirectLink = ({ className = 'italic underline', href, children }:Readonly<IRedirectLinkProps>) => {

  return ( 
    <a 
    className={`'text-teal-700 font-sm hover:text-teal-700/60 transition duration-300 hover:scale-105 ${className}`}
     href={href}>
      { children }
    </a>
  );
};