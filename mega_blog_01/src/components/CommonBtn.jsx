import React from "react";

function CommonBtn({
    children,
    // here,  we create a default parameters
    type = 'button',
    hover_bgColor = 'hover:bg-blue-100',
    textColor = 'text-white',
    bgColor = '',
    className = '',

    // props store==>placeHolder, value, etc.
    ...props
}){
    return(
        <button className={`inline-block px-6 py-2 duration-200 ${hover_bgColor} ${className} ${bgColor} rounded-full`} {...props}>
            {children}
        </button>
    )
}

export default CommonBtn