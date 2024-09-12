import React from 'react'
import Sidebar from "../../components/Sidebar"
import { useSelector } from "react-redux"
import { Outlet } from 'react-router-dom'

const Account = () => {

    const user = useSelector(state => state.user.userData)

    return (
        <>
            <section className="flex justify-center max-md:mx-2">

                <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 md:w-3/4 md:me-20">
                    <Sidebar username={user?.username} image={user?.image} />

                    <section className="md:col-span-2 bg-white shadow-xl">
                        <Outlet />
                    </section>

                </section>
            </section>
        </>
    )
}

export default Account