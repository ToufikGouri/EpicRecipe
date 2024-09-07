import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ image, category }) => {

    const organizedCategoryUrl = category.split(" ").join("-")

    return (
        <>
            <Link to={`/category/${organizedCategoryUrl}`} className='hover:scale-[1.03] duration-200'>
                <img src={image} alt={category} className='min-h-96 object-cover object-center' />
                <h1 className='capitalize text-primaryBlue text-2xl font-bold text-center'>{category}</h1>
            </Link>
        </>
    )
}

export default CategoryCard