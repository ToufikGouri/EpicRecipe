import React from 'react'
import Sidebar from "../../components/Sidebar"
import { Outlet } from 'react-router-dom'

const Account = () => {

    return (
        <>
            <section className="flex justify-center">

                <section className="mt-20 md:mt-32 max-md:mb-16 grid grid-cols-1 md:grid-cols-3 gap-10 w-full md:w-3/4 md:me-20">
                    <Sidebar />

                    <section className="md:col-span-2 max-md:mx-2 bg-white shadow-xl">
                        <Outlet />
                    </section>

                </section>
            </section>
        </>
    )
}

export default Account