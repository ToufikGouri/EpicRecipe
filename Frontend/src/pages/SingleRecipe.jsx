import React, { useEffect, useState } from 'react'
import RecipeImagePlaceholder from "../assets/AddRecipe.png"
import { useNavigate, useParams } from 'react-router-dom'
import { BookmarkIcon, HeartIcon, ShareIcon } from 'lucide-react'
import moment from "moment"
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import Footer from '../components/Footer'
import { modal, toast } from "../myTools"
import { useSelector } from 'react-redux'

const SingleRecipe = () => {

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [randomRecipes, setRandomRecipes] = useState(null)
    const num = 6   // number of random recipes to get

    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)


    // As we don't need to store it in redux, calling api from here directly
    const getSingleRecipe = async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/recipe/${id}`, { withCredentials: true })
            .then((val) => val.data.data)
            .then((val) => { setRecipe(val); setIsLiked(val.isLiked); setIsSaved(val.isSaved) })
            .catch(error => { if (error.response?.data?.statusCode) { setRecipe(404) } })
    }

    const getRandomRecipes = async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/randomrecipes/${num}`, { withCredentials: true })
            .then((val) => val.data.data)
            .then((val) => setRandomRecipes(val))
    }

    const handleLike = async (val) => {
        // if user logged in let him like
        if (isLoggedIn) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/likerecipe`, { recipeId: recipe?._id, likeVal: val }, { withCredentials: true })
                setIsLiked(val)
            } catch (error) {
                toast.fire({
                    icon: "error",
                    title: `${error.response?.data?.message || "Failed To Like"}`
                })
            }
        } else {
            modal("Login To Continue", "Login", "Cancel", "#ff5e4d")
                .then((val) => {
                    if (val.isConfirmed) {
                        navigate("/login")
                    }
                })
        }
    }

    const handleSave = async (val) => {
        // if user logged in let him save
        if (isLoggedIn) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/saverecipe`, { recipeId: recipe?._id, saveVal: val }, { withCredentials: true })
                setIsSaved(val)
                toast.fire({
                    icon: "success",
                    title: `${val ? "Saved Successfully" : "Removed From Saved"}`
                })
            } catch (error) {
                toast.fire({
                    icon: "error",
                    title: `${error.response?.data?.message || "Failed To Save"}`
                })
            }
        } else {
            modal("Login To Continue", "Login", "Cancel", "#ff5e4d")
                .then((val) => {
                    if (val.isConfirmed) {
                        navigate("/login")
                    }
                })
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.fire({
                    icon: "success",
                    title: "Link Copied"
                })
            })
    }

    useEffect(() => {
        getSingleRecipe()
        getRandomRecipes()
        document.getElementById("singleRecipe").scrollIntoView()
    }, [id, isLiked])

    if (recipe === 404) navigate("/page-not-found")

    return (
        <>
            <main id='singleRecipe' className='md:w-3/5 m-auto'>
                <div className="pt-[63px]"></div>

                {/* Hero section */}
                <section className='m-2 my-10 sm:mx-20 space-y-3'>
                    <h1 className='text-2xl sm:text-4xl capitalize font-bold'>{recipe?.title}</h1>

                    <div className="subDetails grid grid-cols-3 md:grid-cols-6 place-items-center max-sm:gap-2 text-xs sm:text-sm">
                        <p className='capitalize text-primaryGrey col-span-2'>Submited by&nbsp;<span className='font-bold text-black'>{recipe?.owner?.username}</span></p>
                        <p className='flex items-center'><HeartIcon fill='red' height={20} color='red' />{recipe?.likes?.length}</p>
                        <p className='uppercase px-4 border-2 text-primaryGrey border-primaryGrey'>{recipe?.category}</p>
                        <p className="text-primaryGrey col-span-2">Published On {moment(recipe?.createdAt).format("MMMM Do, YYYY")}</p>
                    </div>

                    <h4 className='text-xl'>{recipe?.description}</h4>

                    {/* Buttons */}
                    <div className="btns space-x-4">
                        <button onClick={() => handleLike(!isLiked)} className="uppercase p-1 px-6 rounded-md text-primaryRed border-2 border-primaryRed hover:bg-gray-200"><HeartIcon className={`${isLiked ? "fill-primaryRed" : ""}`} /></button>
                        <button onClick={() => handleSave(!isSaved)} className="uppercase p-1 px-6 rounded-md text-primaryRed border-2 border-primaryRed hover:bg-gray-200"><BookmarkIcon className={`${isSaved ? "fill-primaryRed" : ""}`} /></button>
                        <button onClick={handleShare} className="uppercase p-1 px-6 rounded-md text-primaryRed border-2 border-primaryRed hover:bg-gray-200"><ShareIcon /></button>
                    </div>

                    {
                        recipe && recipe.image ?
                            <img src={recipe.image} alt={recipe.title} className='object-contain max-h-96 w-full' />
                            :
                            <div className='flex flex-col items-center'>
                                <img src={RecipeImagePlaceholder} alt="No Image Available" className='size-40 sm:size-60' />
                                <h1 className='text-center text-2xl text-primaryGrey uppercase font-bold'>No Image <br /> <span>Available</span></h1>
                            </div>
                    }

                </section>

                {/* Details section */}
                <section className='m-2 my-10 sm:mx-20 space-y-5 text-2xl'>
                    <h1>
                        <span className='font-bold'>Preparation Time:</span> {recipe?.preparationTime} mins
                    </h1>
                    <h1>
                        <span className='font-bold'>Servings:</span> {recipe?.servings}
                    </h1>
                    <h1 className='font-bold'>Ingredients</h1>
                    <ul className='ms-6 mt-4 text-base list-disc'>
                        {recipe?.ingredients.map((val, ind) =>
                            <li key={ind}>
                                {val}
                            </li>
                        )}
                    </ul>
                    <h1 className='font-bold'>Directions</h1>
                    <ul className='mt-4 text-base'>
                        {recipe?.directions.map((val, ind) =>
                            <li key={ind} className='my-2'>
                                <h1 className='font-bold'>Step {ind + 1}</h1>
                                {val}
                            </li>
                        )}
                    </ul>
                </section>

                {/* Suggested recipes section */}
                <section className='m-2 my-20 sm:mx-20'>
                    <h1 className='text-primaryBlue text-xl text-center'>Enjoy your meal! <br /> Ready for more? Explore more delicious recipes below!</h1>

                    <div className='my-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {randomRecipes && randomRecipes.map((val) =>
                            <RecipeCard key={val._id} id={val._id} image={val.image} title={val.title} category={val.category} />
                        )}
                    </div>
                </section>

            </main>

            {/* Footer section */}
            <Footer />
        </>
    )
}

export default SingleRecipe