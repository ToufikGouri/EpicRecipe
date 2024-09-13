import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserRecipes, setReloadPage } from '../../redux/userSlice'
import ProfileRecipeCard from '../../components/ProfileRecipeCard'

const MyRecipes = () => {

    const user = useSelector(state => state.user.userData)
    const userRecipes = useSelector(state => state.user.userRecipes)
    const reloadPage = useSelector(state => state.user.reloadPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserRecipes(user?.username))
        dispatch(setReloadPage(false))      // will reload page when dispatch(setReloadPage(true))
    }, [user, reloadPage])


    return (
        <>
            <section className='p-6'>

                {/* Headings */}
                <div className="headings">
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl font-bold'>Recipes made by me</h1>
                    <p className='sm:text-xl mt-3 my-1'>You have added {userRecipes?.length} recipes so far, keep going!</p>
                </div>

                {/* Cards */}
                <div className='my-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {userRecipes && userRecipes.map((val) =>
                        <ProfileRecipeCard key={val._id} recipeData={val} />
                    )}
                </div>

            </section>
        </>
    )
}

export default MyRecipes