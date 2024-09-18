import React, { useEffect, useState } from 'react'
import { LockKeyholeIcon, TrashIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Loading, modal, toast } from "../../myTools"
import { getUserData } from '../../redux/userSlice'
import useTitle from '../../components/useTitle'

const Profile = () => {

  useTitle("Personal Info")
  const user = useSelector(state => state.user.userData)
  const defaultProfiles = useSelector(state => state.user.defaultProfiles)
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [userImage, setUserImage] = useState("")
  const [userImagePreview, setUserImagePreview] = useState("")

  const handleUsername = async (e) => {
    e.preventDefault()

    const updateUsername = username.trim().toLowerCase()
    if (!updateUsername) {
      toast.fire({
        icon: "warning",
        title: "Please enter valid username"
      })
      return
    }

    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateprofile`, { username: updateUsername }, { withCredentials: true })

      toast.fire({
        icon: "success",
        title: "Username updated successfully"
      })
      // Update user data on page
      dispatch(getUserData())

    } catch (error) {
      toast.fire({
        icon: "error",
        title: `${error.response?.data?.message || "Failed To Update Username"}`
      })
    }
  }

  const handleImage = async () => {

    if (!userImage) {
      toast.fire({
        icon: "error",
        title: "Please provide valid image"
      })
      return
    }

    // checking if user selected default profile
    let isDefaultProfile = defaultProfiles?.includes(userImage);

    const formData = new FormData()
    if (isDefaultProfile) {
      formData.append("defaultImage", userImage)
    } else {
      formData.append("image", userImage)
    }

    Loading("Updating Profile Image")
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateprofile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      Loading().close()
      toast.fire({
        icon: "success",
        title: "Image updated successfully"
      })
      // Update user data on page
      dispatch(getUserData())

    } catch (error) {
      Loading().close()
      toast.fire({
        icon: "error",
        title: `${error.response?.data?.message || "Failed To Update Image"}`
      })
    }

  }

  const handleInputImage = (e) => {
    const file = e.target.files[0]
    setUserImage(file)

    // Create an object URL for the selected file to preview
    const imageUrl = URL.createObjectURL(file);

    // revoke the object URL if already exists
    if (imageUrl) {
      URL.revokeObjectURL(userImage)
    }
    setUserImagePreview(imageUrl)
  }

  const handleDeleteImage = () => {
    const defaultImage = "https://res.cloudinary.com/duj7aqdfc/image/upload/v1724665397/EpicRecipes/UserProfiles/DefaultProfile/DefaultImage.png"

    modal("Remove Profile Image?", "Remove", "Cancel", "red")
      .then((res) => {
        if (res.isConfirmed) {
          ; (async () => {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateprofile`, { "defaultImage": defaultImage }, { withCredentials: true })
            toast.fire({
              icon: "success",
              title: "Image Removed Successfully"
            })
            // Update user data on page
            dispatch(getUserData())
          })();
        } else if (res.isDismissed) {
          toast.fire({
            icon: "info",
            title: "Image Not Removed"
          })
        }
      }).catch((error) =>
        toast.fire({
          icon: "error",
          title: `${error.response?.data?.message || "Failed To Remove Image"}`
        })
      )

  }


  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setUserImage(user.image)
      setUserImagePreview(user.image)
    }
  }, [user])

  return (
    <>
      <section className='p-6'>

        {/* Headings */}
        <div className="headings">
          <h1 className='text-primaryBlue text-2xl sm:text-4xl capitalize font-bold'>Personal Info</h1>
          <p className='sm:text-xl mt-3 my-1'>Manage your details and get up to date with others.</p>
          <p className='text-xs text-primaryGrey flex items-center'><LockKeyholeIcon height={15} /> Only you can see the information on this page. It will not be displayed for other users to see.</p>
        </div>

        {/* Inputs */}
        <div className="inputs mt-10 flex justify-between max-md:flex-col-reverse">

          {/* Email & Username*/}
          <div className='space-y-6 md:w-3/5'>
            <div>
              <h1 className='font-bold text-xl'>Email Address</h1>
              <p className="p-2 border-2 border-black bg-slate-200 cursor-not-allowed">{user?.email}</p>
            </div>
            {/* Update username */}
            <div>
              <label htmlFor='updateUsername' className='font-bold text-xl'>Username</label>
              <form onSubmit={handleUsername} className='update-username flex'>
                <input id='updateUsername' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={5} className='p-2 w-full outline-primaryBlue border-2 border-black' placeholder='@username' />
                {user?.username !== username &&
                  <>
                    <button type="submit" className='w-24 mx-1 primaryBtn rounded-none'>Save</button>
                    <button onClick={() => setUsername(user?.username)} className='p-2 px-5 uppercase border-2 border-black hover:bg-gray-200'>Cancel</button>
                  </>
                }
              </form>
            </div>
            <Link to="/account/changepassword" className='md:w-2/4 primaryBtn rounded-none'>Manage Password</Link>
          </div>

          {/* Update image */}
          <div className="update-image flex justify-center items-center max-md:flex-col md:space-x-10">
            <div>
              <img src={userImagePreview} alt={user?.username} className='size-32 rounded-full object-contain border border-primaryGrey' />
              <input onChange={(e) => handleInputImage(e)} type="file" accept='image/*' id="inputImage" className='hidden' />
              {user?.image === userImagePreview ?
                <label htmlFor='inputImage' className='w-full mt-4 primaryBtn rounded-none cursor-pointer'>Select</label>
                : <>
                  <button onClick={handleImage} className='w-full mt-4 primaryBtn rounded-none'>Save</button>
                  <button onClick={() => { setUserImage(user?.image); setUserImagePreview(user?.image) }} className='w-full mt-2 p-1.5 px-5 font-bold uppercase border-2 border-black hover:bg-gray-200'>Cancel</button>
                </>
              }
            </div>
            {/* Default images */}
            <div className='grid place-items-center max-md:grid-flow-col max-md:my-6 max-md:w-full'>
              {defaultProfiles?.map((val, ind) =>
                <img onClick={() => { setUserImage(val); setUserImagePreview(val) }} key={ind} src={val} alt="default img" className='size-12 rounded-full cursor-pointer' />
              )}
              <button onClick={handleDeleteImage} className='md:mt-4 size-10 grid place-items-center text-primaryRed border-2 border-primaryRed rounded-full hover:bg-secondaryRed hover:text-white hover:border-transparent duration-100'><TrashIcon height={15} /></button>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default Profile