import React from 'react'
import { Link } from 'react-router-dom'
import RecipeImagePlaceholder from "../assets/AddRecipe.png"

const RecipeCard = ({ id, title, image, category = "" }) => {
    return (
        <>
            <Link to={`/recipes/${id}`} className='hover:scale-[1.03] duration-200'>
                <img src={image || RecipeImagePlaceholder} alt={title} className='min-h-96 object-cover object-center' />
                <h1 className='uppercase text-primaryGrey'>{category}</h1>
                <h1 className='text-xl'>{title}</h1>
            </Link>
        </>
    )
}

export default RecipeCard