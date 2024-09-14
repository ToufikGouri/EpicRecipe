import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedRecipes, setReloadPage } from '../../redux/userSlice'
import ProfileRecipeCard from '../../components/ProfileRecipeCard'

const SavedRecipes = () => {

    const user = useSelector(state => state.user.userData)
    const savedRecipes = useSelector(state => state.user.savedRecipes)
    const reloadPage = useSelector(state => state.user.reloadPage)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [paginationArray, setPaginationArray] = useState([2, 3, 4])

    const handlePagination = (val) => {
        if (val > page && savedRecipes?.length < limit) return;    // for last page

        if (val <= 3 && page > 3) {
            setPaginationArray([2, 3, 4])
        }
        if (val > 3 && val !== page) {
            const checkVal = val > page ? 1 : -1
            setPaginationArray(paginationArray.map(val => val + checkVal))
        }
        setPage(val)
        window.scrollTo({ top: 0 })
    }

    useEffect(() => {
        dispatch(getSavedRecipes({ page, limit }))
        dispatch(setReloadPage(false))      // will reload page when dispatch(setReloadPage(true))
    }, [user, reloadPage, page])


    return (
        <>
            <section className='p-6'>

                {/* Headings */}
                <div className="headings">
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl font-bold'>Saved Recipes</h1>
                    <p className='sm:text-xl mt-3 my-1'>All your saved recipes will be shown here, save the recipes you like so you would never lose them.</p>
                </div>

                {/* Cards */}
                <div className='my-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {savedRecipes && savedRecipes.map((val) =>
                        <ProfileRecipeCard key={val._id} recipeData={val} savedCard />
                    )}
                </div>

                {/* Pagination */}
                <h1 className={`my-8 text-primaryBlue text-xl sm:text-2xl font-bold flex justify-center ${savedRecipes?.length < limit ? "block" : "hidden"}`}>
                    End Of Recipes <button onClick={() => handlePagination(1)} className="ms-2 text-base rounded-full px-4 text-white bg-primaryRed hover:bg-secondaryRed">Back to first page</button>
                </h1>
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
        </>
    )
}

export default SavedRecipes