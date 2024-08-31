import React, { useState } from 'react'
import ER_Logo from "../assets/ER_Logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { Search as SearchIcon, UserCircle2 as UserIcon, Menu as MenuIcon, X as CloseIcon } from "lucide-react"

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className='Navbar fixed top-0 z-50 bg-white h-16 w-full flex justify-evenly items-center border border-b-secondaryGrey'>

        <Link to="/" className="Logo inline-flex items-center pb-4">
          <img src={ER_Logo} className='w-28 sm:w-40' alt="EpicRecipes" />
        </Link>

        <ul className='navItems-fs max-sm:hidden w-2/4 uppercase font-bold flex justify-around'>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/recipes">Recipes</NavLink></li>
          <li><NavLink to="/category">By Category</NavLink></li>
          <li><NavLink to="/account/addrecipe">Add Recipe</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        {/* SearchBar */}
        <div className='flex relative group'>
          <input type="text" placeholder="Search recipes..."
            className='w-48 sm:w-72 rounded-2xl py-1 ps-2 pe-8 border-2 border-primaryGrey outline-none bg-white hover:bg-gray-100'
          />
          <SearchIcon className='absolute top-2/4 -translate-y-2/4 right-2' />
        </div>

        <Link to="/account" className='max-sm:hidden'>
          <UserIcon className='size-7 hover:text-primaryRed' />
        </Link>

        {/* Menu btn for small screen */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='sm:hidden'>
          {isMenuOpen ? <CloseIcon className='size-7' /> : <MenuIcon className='size-7' />}
        </button>

        {/* Nav for small screen */}
        <ul className={`navItems-ss ${isMenuOpen ? "" : "hidden"} h-screen w-full uppercase font-bold text-xl border border-t-0 border-secondaryGrey`}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/recipes">Recipes</NavLink></li>
          <li><NavLink to="/category">By Category</NavLink></li>
          <li><NavLink to="/account/addrecipe">Add Recipe</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar