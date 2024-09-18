import React, { useEffect } from 'react'
import HeroImage from "../assets/HeroCategory.jpg"
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from '../redux/recipeSlice'
import RecipeCard from '../components/RecipeCard'
import Footer from '../components/Footer'
import CategoryCard from '../components/CategoryCard'
import useTitle from '../components/useTitle'

const Category = () => {

    useTitle("Category")
    const allCategoriesData = useSelector(state => state.recipe.allCategories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <>
            <section>

                {/* Hero section */}
                <section>
                    <div className={`mt-[63px] h-[50vh] w-full bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${HeroImage})` }}></div>
                    <div className="m-2 my-10 sm:mx-20">
                        <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold'>Recipes by Category</h1>
                        <p className='mt-4 sm:text-xl'>Search over 30+ whole food recipes by course, meat, or cuisine. Or scroll to discover the latest recipes from our best, most popular categories! From home cooking to healthy treats and more, you’ll find everything you need to cook up some wholesome and healthy dinners for tonight.</p>
                    </div>
                </section>

                {/* Categories section */}
                <section className='m-2 my-10 sm:mx-20'>
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold text-center'>Popular Categories</h1>
                    {/* Cards */}
                    <div className='my-8 grid grid-cols-1 md:grid-cols-4 gap-5 place-items-center'>
                        {allCategoriesData && allCategoriesData.map((val) =>
                            <CategoryCard key={val.category} image={val.image} category={val.category} />
                        )}
                    </div>

                    <p className='my-10 text-center font-semibold'>
                        Can’t find the category you are looking for? <br />
                        Search from top and get your desired results.
                    </p>
                </section>

                {/* Footer section */}
                <Footer />

            </section>
        </>
    )
}

export default Category