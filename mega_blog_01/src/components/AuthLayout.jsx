// mechanism to protect pages routing
// work with more projects next.js, etc.

import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({
    children,
    authentication=true
}){
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state=>state.status)
    const navigate = useNavigate()
    useEffect(()=>{
        // true && false !== true ==> true && true
        // false && false !== false ==> false && false
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }
        // false && true !== true ==> false && false
        // true && false 
        else if(!authentication && authStatus !== authentication){
            // navigate('/login')
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader? <h1>Loading...</h1> : <>{children}</>
}