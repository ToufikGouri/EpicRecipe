import React from 'react'
import { Link } from "react-router-dom"

const TrendingSection = ({ data }) => {

    const heroData = data[0]
    const restData = data.slice(1)

    return (
        <>
            <section className='m-2 my-10 sm:mx-20'>
                <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold'>Trending Recipes!</h1>
                <p className='text-primaryBlue sm:text-xl'>Which of these have you made?</p>

                <div className='min-h-[80vh] md:h-[80vh] mt-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 '>
                    {/* Big image */}
                    <Link to={`/recipes/${heroData._id}`} className="sideLeft hover:scale-[1.03] duration-200 relative h-full w-full row-span-2">
                        <img src={heroData.image} alt={heroData.title} className='w-full h-full object-cover' />
                        <h1 className='text-white w-full text-3xl text-center font-bold textShadow absolute bottom-2 md:bottom-80'>{heroData.title}</h1>
                    </Link>
                    {/* Smaller images */}
                    <div className="sideRight h-full w-full grid grid-cols-2 grid-rows-2 gap-6">
                        {restData.map((val) =>
                            <Link to={`/recipes/${val._id}`} key={val._id} className='relative hover:scale-[1.03] duration-200'>
                                <img src={val.image} alt={val.title} className='w-full h-[270px] object-cover' />
                                <h1 className='w-full text-white sm:text-xl text-center font-bold textShadow absolute bottom-2'>{val.title}</h1>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrendingSection