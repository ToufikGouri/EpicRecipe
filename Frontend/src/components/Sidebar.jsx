import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { modal, toast } from '../myTools'
import { useSelector, useDispatch } from 'react-redux'
import { setUserdata, setUserLog } from '../redux/userSlice'
import { BookHeartIcon, BookmarkIcon, CirclePlusIcon, CircleUserRoundIcon, LockKeyholeIcon, LogOutIcon } from "lucide-react"
import axios from 'axios'

const Sidebar = () => {

  const user = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {

    modal("Logout From EpicRecipes?", "Logout", "Cancel", "red")
      .then((val) => {
        if (val.isConfirmed) {
          ; (async () => {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {}, { withCredentials: true })
            navigate("/");
            // delaying below methods by 0ms just let navigate work first
            setTimeout(() => {
              localStorage.removeItem("isLoggedIn")
              dispatch(setUserdata(null))
              dispatch(setUserLog(false))
            }, 0);

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
      <aside className='sidebar md:h-[425px] fixed md:sticky md:top-16 col-span-1 bg-white shadow-xl
      max-md:w-[96%] max-md:bottom-0 max-md:left-2/4 max-md:-translate-x-2/4'>

        {/* User data */}
        <div className='max-md:hidden m-6 flex justify-center items-center font-bold text-xl'>
          <img src={user?.image} alt="User" className="size-20 me-4 rounded-full object-contain border border-primaryGrey" />
          Hii, {user?.username}
        </div>

        <ul className='max-md:hidden sidebar-fs text-lg'>
          <li><NavLink to={"/account/profile"}>Personal Info</NavLink></li>
          <li><NavLink to={"/account/changepassword"}>Change Password</NavLink></li>
          <li><NavLink to={"/account/addrecipe"}>Add Recipe</NavLink></li>
          <li><NavLink to={"/account/myrecipes"}>My Recipes</NavLink></li>
          <li><NavLink to={"/account/savedrecipes"}>Saved Recipes</NavLink></li>
          <li><button onClick={handleLogout} className='w-full text-start py-[10px] p-5 text-white bg-primaryRed hover:bg-secondaryRed'>Log out</button></li>
        </ul>

        <ul className='md:hidden sidebar-ss flex justify-between border-t-2 border-secondaryGrey'>
          <li><NavLink to={"/account/profile"}><CircleUserRoundIcon /></NavLink></li>
          <li><NavLink to={"/account/changepassword"}><LockKeyholeIcon /></NavLink></li>
          <li><NavLink to={"/account/addrecipe"}><CirclePlusIcon /></NavLink></li>
          <li><NavLink to={"/account/myrecipes"}><BookHeartIcon /></NavLink></li>
          <li><NavLink to={"/account/savedrecipes"}><BookmarkIcon /></NavLink></li>
          <li><button onClick={handleLogout} className='w-full flex justify-center items-center text-start text-white bg-primaryRed hover:bg-secondaryRed'><LogOutIcon /></button></li>
        </ul>

      </aside>
    </>
  )
}

export default Sidebar