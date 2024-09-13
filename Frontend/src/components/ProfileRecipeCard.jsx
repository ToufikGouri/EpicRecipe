import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RecipeImagePlaceholder from "../assets/AddRecipe.png"
import { modal, toast } from '../myTools'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setRecipeToUpdate, setReloadPage } from '../redux/userSlice'

const ProfileRecipeCard = ({ recipeData, savedCard = false }) => {

    const { _id, title, image, category = "" } = recipeData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdateRecipe = async () => {

        dispatch(setRecipeToUpdate(recipeData))
        navigate("/account/updaterecipe")

    }

    const handleDeleteRecipe = () => {

        modal("Delete Recipe?", "Delete", "Cancel", "red")
            .then((res) => {
                if (res.isConfirmed) {
                    ; (async () => {
                        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/deleterecipe/${id}`, { withCredentials: true })
                        toast.fire({
                            icon: "success",
                            title: "Recipe Deleted Successfully"
                        })
                        // Update user recipe on page
                        dispatch(setReloadPage(true))
                    })();
                }
            }).catch((error) =>
                toast.fire({
                    icon: "error",
                    title: `${error.response?.data?.message || "Failed To Delete Recipe"}`
                })
            )

    }

    return (
        <>
            <div>
                <Link to={`/recipes/${_id}`} className='hover:scale-[1.03] duration-200'>
                    <img src={image || RecipeImagePlaceholder} alt={title} className='min-h-96 object-cover object-center' />
                    <h1 className='uppercase text-primaryGrey'>{category}</h1>
                    <h1 className='text-xl'>{title}</h1>
                </Link>
                {
                    !savedCard ?
                        <div className='flex mt-4 space-x-4'>
                            <button onClick={handleDeleteRecipe} className='p-2 px-5 w-2/4 uppercase text-primaryRed border-2 border-primaryRed hover:bg-gray-200'>Delete</button>
                            <button onClick={handleUpdateRecipe} className='p-2 px-5 w-2/4 uppercase text-white bg-primaryBlue hover:bg-primaryBlue/80'>Update</button>
                        </div>
                        : <div>
                            <button className='primaryBtn rounded-none'>Unsave</button>
                        </div>
                }
            </div>
        </>
    )
}

export default ProfileRecipeCard