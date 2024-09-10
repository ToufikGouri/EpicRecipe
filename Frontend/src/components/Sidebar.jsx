import React from 'react'
import { NavLink } from "react-router-dom"

const Sidebar = ({ username, image }) => {
  return (
    <>
      <main className='sidebar col-span-1 bg-white shadow-xl'>

        {/* User data */}
        <div className='m-6 flex justify-center items-center font-bold text-xl'>
          <img src={image} alt="User" className="size-20 me-4 rounded-full object-contain border border-primaryGrey" />
          Hii, {username}
        </div>

        <ul className='text-lg'>
          <li><NavLink to={"/account/profile"}>Personal Info</NavLink></li>
          <li><NavLink to={"/account/changepassword"}>Change Password</NavLink></li>
          <li><NavLink to={"/account/some"}>Add Recipe</NavLink></li>
          <li><NavLink to={"/account/some"}>My Recipes</NavLink></li>
          <li><NavLink to={"/account/some"}>Saved Recipes</NavLink></li>
          <li><button className='w-full text-start py-[10px] p-5 text-white bg-primaryRed hover:bg-secondaryRed'>Log out</button></li>
        </ul>

      </main>
    </>
  )
}

export default Sidebar