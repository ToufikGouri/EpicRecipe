import React, { useEffect } from 'react'

const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} | EpicRecipes`
    }, [title])

}

export default useTitle