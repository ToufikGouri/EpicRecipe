import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ id, title, image }) => {
    return (
        <>
            <Link to={`/recipes/recipe/${id}`} className='hover:scale-[1.03] duration-200'>
                <img src={image} alt={title} className='min-h-96 object-cover object-center' />
                <h1 className='text-xl'>{title}</h1>
            </Link>
        </>
    )
}

export default RecipeCard