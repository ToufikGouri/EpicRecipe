import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { modal, toast } from '../myTools'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserdata, setUserLog } from '../redux/userSlice'

const Sidebar = ({ username, image }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {

    modal("Logout From EpicRecipes?", "Logout", "Cancel", "red")
      .then((val) => {
        if (val.isConfirmed) {
          ; (async () => {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {}, { withCredentials: true })
            navigate("/")
            dispatch(setUserdata(null))
            dispatch(setUserLog(false))
          })()
        }
      })
      .catch((error) =>
        toast.fire({
          icon: "error",
          title: `${error.response?.data?.message || "Failed To Logout"}`
        })
      )
  }

  return (
    <>
      <main className='sidebar h-[425px] stickys top-16 col-span-1 bg-white shadow-xl'>

        {/* User data */}
        <div className='m-6 flex justify-center items-center font-bold text-xl'>
          <img src={image} alt="User" className="size-20 me-4 rounded-full object-contain border border-primaryGrey" />
          Hii, {username}
        </div>

        <ul className='text-lg'>
          <li><NavLink to={"/account/profile"}>Personal Info</NavLink></li>
          <li><NavLink to={"/account/changepassword"}>Change Password</NavLink></li>
          <li><NavLink to={"/account/addrecipe"}>Add Recipe</NavLink></li>
          <li><NavLink to={"/account/myrecipes"}>My Recipes</NavLink></li>
          <li><NavLink to={"/account/savedrecipes"}>Saved Recipes</NavLink></li>
          <li><button onClick={handleLogout} className='w-full text-start py-[10px] p-5 text-white bg-primaryRed hover:bg-secondaryRed'>Log out</button></li>
        </ul>

      </main>
    </>
  )
}

export default Sidebar