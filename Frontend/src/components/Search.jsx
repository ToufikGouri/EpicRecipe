import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import LoadingGif from "../assets/Loading.gif"
import axios from 'axios'

const Search = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [isNoResult, setIsNoResult] = useState(false)

    const handleSearch = async () => {
        const key = search.trim()
        if (!key) return

        setLoading(true)
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/search?key=${key}`, { withCredentials: true })
                .then(val => val.data.data)
                .then(val => { setSearchResult(val); setLoading(false); setIsNoResult(false) })
        } catch (error) {
            setSearchResult([])
            setLoading(false)
            setIsNoResult(true)
        }
    }

    useEffect(() => {
        // debounce function that'll run after given delay
        let timer = setTimeout(() => {
            if (search.trim()) {
                handleSearch()
            } else {
                setSearchResult([])
                setLoading(false)
                setIsNoResult(false)
            }
        }, 800)
        // cleanup function if new api call made
        return () => clearTimeout(timer)
    }, [search])


    return (
        <>
            <section className='flex relative group'>

                {/* Search input */}
                <input type="text" placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-48 md:w-72 rounded-2xl py-1 ps-2 pe-8 border-2 border-primaryGrey outline-none bg-white hover:bg-gray-100'
                />
                <SearchIcon className='absolute top-2/4 -translate-y-2/4 right-2' />

                {/* Search results */}
                {
                    (search.trim() && searchResult.length > 0) &&
                    <div onClick={() => { setSearch(""); setSearchResult([]) }} className='w-11/12 absolute top-9 left-2/4 -translate-x-2/4 bg-white shadow-xl rounded-b-md border border-t-transparent border-primaryGrey'>
                        {searchResult.map((val) =>
                            <Link key={val._id} to={`/recipes/${val._id}`} className='p-1 max-md:text-sm flex border-b border-primaryGrey hover:bg-secondaryGrey/50'>
                                {val.title.slice(0, 28) + (val.title.length >= 28 ? "..." : "")}
                            </Link>
                        )}
                    </div>
                }

                {/* Loading */}
                {loading &&
                    <div className='w-11/12 absolute top-9 left-2/4 -translate-x-2/4 bg-slate-100 rounded-b-md border-2 border-t-transparent border-primaryGrey'>
                        <img src={LoadingGif} alt="Loading..." className='size-12 m-auto' />
                    </div>
                }

                {/* If search exists but no result */}
                {isNoResult &&
                    <h1 className='text-xl text-center p-1 w-11/12 absolute top-9 left-2/4 -translate-x-2/4 bg-slate-100 rounded-b-md border-2 border-t-transparent border-primaryGrey'>
                        No results found
                    </h1>
                }

            </section>
        </>
    )
}

export default Search