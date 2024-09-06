import React, { useEffect, useState } from 'react'
import HeroImage from "../assets/HeroRecipe.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, getTopRecipes } from '../redux/recipeSlice'
import RecipeCard from '../components/RecipeCard'
import Footer from '../components/Footer'

const Recipes = () => {

    const topRecipesData = useSelector(state => state.recipe.topRecipes)
    const allRecipesData = useSelector(state => state.recipe.allRecipes)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8) 
    const [paginationArray, setPaginationArray] = useState([2, 3, 4])

    const handlePagination = (val) => {
        if (val > page && allRecipesData?.length < limit) return;    // for last page

        if (val <= 3 && page > 3) {
            setPaginationArray([2, 3, 4])
        }
        if (val > 3 && val !== page) {
            const checkVal = val > page ? 1 : -1
            setPaginationArray(paginationArray.map(val => val + checkVal))
        }
        setPage(val)
        document.getElementById("allRecipes").scrollIntoView()
    }


    useEffect(() => {
        dispatch(getTopRecipes())
        dispatch(getAllRecipes({ page, limit }))
    }, [page])


    return (
        <>
            <main>

                {/* Hero section */}
                <section>
                    <div className={`mt-[63px] h-[50vh] w-full bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${HeroImage})` }}></div>
                    <div className="m-2 my-10 sm:mx-20">
                        <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold'>All Recipes</h1>
                        <p className='mt-4 sm:text-xl'>Recipes for lovers of good food! From easy dinner recipes to cosy soups, slurp worthy pastas and Chinese takeout, we’re all about big flavours and recipes that always work!</p>
                    </div>
                </section>

                {/* Top recipes section */}
                <section className='m-2 my-10 sm:mx-20'>
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold text-center'>Explore Top Recipes</h1>
                    <div className='my-8 grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center'>
                        {topRecipesData && topRecipesData.map((val) =>
                            <RecipeCard key={val._id} id={val._id} image={val.image} title={val.title} category={val.category} />
                        )}
                    </div>
                </section>

                {/* All recipes section */}
                <section id='allRecipes' className='m-2 pt-[63px] mb-20 sm:mx-20'>
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold text-center'>Our Recipes</h1>
                    {/* Cards */}
                    <div className='my-8 grid grid-cols-1 md:grid-cols-4 gap-5'>
                        {allRecipesData && allRecipesData.map((val) =>
                            <RecipeCard key={val._id} id={val._id} image={val.image} title={val.title} category={val.category} />
                        )}
                    </div>
                    <h1 className={`my-8 text-primaryBlue text-xl sm:text-2xl font-bold flex justify-center ${page > 1 && allRecipesData?.length < limit ? "block" : "hidden"}`}>
                        End Of Recipes <button onClick={() => handlePagination(1)} className="ms-2 text-base rounded-full px-4 text-white bg-primaryRed hover:bg-secondaryRed">Back to first page</button>
                    </h1>
                    {/* Pagination */}
                    <div className='flex justify-center space-x-2'>
                        <button onClick={() => handlePagination(1)} className={`size-8 grid place-items-center rounded-full ${page === 1 ? "bg-primaryBlue hover:bg-primaryBlue/80" : "bg-primaryRed hover:bg-secondaryRed"} text-white`}>1</button>
                        <p className={`size-8 grid place-items-center rounded-full bg-primaryRed text-white ${page <= 3 ? "hidden" : ""}`}>...</p>

                        {paginationArray.map((val) =>
                            <button key={val} onClick={() => handlePagination(val)} className={`size-8 grid place-items-center rounded-full ${page === val ? "bg-primaryBlue hover:bg-primaryBlue/80" : "bg-primaryRed hover:bg-secondaryRed"} text-white`}>
                                {val}
                            </button>
                        )}

                        <p className={`size-8 grid place-items-center rounded-full bg-primaryRed text-white`}>...</p>
                        <button onClick={() => handlePagination(page + 1)} className={`size-8 grid place-items-center rounded-full bg-primaryRed hover:bg-secondaryRed text-white w-16`}>Next</button>
                    </div>
                </section>

                {/* Footer section */}
                <Footer />

            </main>
        </>
    )
}

export default Recipes