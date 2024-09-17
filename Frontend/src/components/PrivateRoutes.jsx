import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

    const isLoggedIn = localStorage.getItem("isLoggedIn") 
    
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes