import React from "react";
import logoFav from '../assets/icons8-favicon-50.png'

// here pass the default width
function Logo({width = '100px'}){
    return(
        <>
        {/* <div style={{width:`${width}`}}>LOGO</div> */}
        <div>
            <img src={logoFav} alt="LOGO" style={{width:`${width}`}}/>
        </div>
        </>
    )
}

export default Logo