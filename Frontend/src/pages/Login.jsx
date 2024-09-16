import React, { useState } from 'react'
import HeroImage from "../assets/HeroAuth.jpg"
import ER_Logo from "../assets/ER_Logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import SweetAlert from "sweetalert2"
import axios from "axios"
import { setUserLog } from '../redux/userSlice'

const Login = () => {

    const toast = SweetAlert.mixin({
        toast: true,
        position: "top",
        timer: 2000,
        showConfirmButton: false,
    })

    // Dispatch userLog to trigger App.jsx and update userdata in state
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        // most validations are handled in form itself 
        const updatedUsername = username.trim().toLowerCase()

        if (!updatedUsername || !password) {
            toast.fire({
                icon: "warning",
                title: "All field are required"
            })
            return
        }

        const userData = { password }
        if (updatedUsername.includes("@gmail.com")) {
            userData.email = updatedUsername
        } else {
            userData.username = updatedUsername
        }

        try {
            const createdUser = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, userData, { withCredentials: true })
                .then((res) => res.data.data.user)

            dispatch(setUserLog(true))
            setUsername("")
            setPassword("")

            toast.fire({
                icon: "success",
                title: "Logged In Successfully"
            })
                .then(() => navigate("/"))
                .then(() => toast.fire({
                    icon: "success",
                    title: `Welcome ${createdUser?.username || "Back"}`
                }))

        } catch (error) {
            toast.fire({
                icon: "error",
                title: `${error.response?.data?.message || "Failed To Log In"}`
            })
        }

    }

    return (
        <>
            <section>

                <section className='md:w-3/5 h-screen m-auto space-y-8 flex flex-col justify-center items-center'>
                    {/* Logo */}
                    <div className={`h-14 md:h-20 w-full bg-no-repeat bg-contain bg-center`} style={{ backgroundImage: `url(${ER_Logo})` }}></div>

                    {/* Main container */}
                    <div className='w-full h-[60vh] max-md:mx-2 grid md:grid-cols-2 place-items-center bg-white shadow-xl'>
                        {/* Hero image */}
                        <div className={`hidden md:block h-full w-full bg-no-repeat bg-cover bg-center shadow-xl`} style={{ backgroundImage: `url(${HeroImage})` }}></div>
                        {/* Auth form */}
                        <div className='h-full w-full px-8 py-2'>
                            <div className="Headings">
                                <h1 className='text-3xl font-bold'>Log in</h1>
                                <p>Login to save and like your favorite recipes.</p>
                            </div>
                            <form onSubmit={handleSubmit} className='h-3/4 md:h-4/5 flex flex-col justify-evenly'>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={5} className='p-2 outline-primaryBlue border-2 border-black' placeholder='Username or email' />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className='p-2 outline-primaryBlue border-2 border-black' placeholder='Your password' />
                                <button type="submit" className='primaryBtn rounded-none'>Log in</button>
                            </form>
                            <p className='text-center'>Don't have an account? <Link to="/signup" className='text-primaryBlue'>Sign up</Link></p>
                        </div>
                    </div>

                </section>

            </section>
        </>
    )
}

export default Login