import React from "react";
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../features/auth/authSlice'
import {CommonBtn} from '../index'

function LogoutBtn(){
    const dispatch = useDispatch()
    // this fetch the logout info from appwrite then change the store value
    const logoutHandler = ()=>{
        // calling the appwrite logout method gives a promise
        authService.createLogout()
        .then(()=>{dispatch(logout())})
        .catch(error=>{console.log(`Header: Logout: Error`, error)})
    }
    return(
        <>
        {/* <button
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
        >
            LogOut
        </button> */}
        
        {/* here, i define a commonBtn */}
        <CommonBtn onClick={logoutHandler} children={"Logout"}/>
        </>
    )
}

export default LogoutBtn