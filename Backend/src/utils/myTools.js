// options for cookie-parser
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 60 * 60 * 24 * 1000
}

// adding isLiked status to each recipe
export const recipeWithLikeStatus = (recipes, userId) => {
    return recipes.map(recipe => {
        const isLiked = recipe.likes.includes(userId)
        return {
            ...recipe._doc,
            isLiked
        }
    })
}