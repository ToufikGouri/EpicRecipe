import React, { useEffect, useState } from 'react'
import RecipeImagePlaceholder from "../assets/AddRecipe.png"
import { useParams } from 'react-router-dom'
import { HeartIcon } from 'lucide-react'
import moment from "moment"
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import Footer from '../components/Footer'

const SingleRecipe = () => {

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [randomRecipes, setRandomRecipes] = useState(null)
    const num = 6   // number of random recipes to get

    // As we don't need to store it in redux, calling api from here directly
    const getSingleRecipe = async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/recipe/${id}`, { withCredentials: true })
            .then((val) => val.data.data)
            .then((val) => setRecipe(val))
    }

    const getRandomRecipes = async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/randomrecipes/${num}`, { withCredentials: true })
            .then((val) => val.data.data)
            .then((val) => setRandomRecipes(val))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getSingleRecipe()
        getRandomRecipes()
        document.getElementById("singleRecipe").scrollIntoView()
    }, [id])


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

                    <div className="btns border-2X border-black">
                        BUTTONS HERE
                        {/* {navigator.clipboard.writeText(window.location.href)} */}
                    </div>

                    {
                        recipe && recipe.image ?
                            <img src={recipe.image} alt={recipe.title} className='object-contains max-h-96 w-full' />
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