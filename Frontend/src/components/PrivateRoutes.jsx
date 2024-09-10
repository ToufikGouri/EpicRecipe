import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    console.log("Is Logged in??", isLoggedIn);

    useEffect(() => {
        console.log("Check again in useEffect", isLoggedIn);
    }, [isLoggedIn])

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes