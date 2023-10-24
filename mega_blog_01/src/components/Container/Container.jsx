import React from "react";

function Container({children}){
    // while using single div, we can allowed to remove small backets
    return <div className="w-full max-w-7xl mx-auto px-4">
            {children}
        </div>;
}

export default Container