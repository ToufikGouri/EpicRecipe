import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getUserData } from './redux/userSlice'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Recipes from './pages/Recipes'
import SingleRecipe from './pages/SingleRecipe'
import Category from './pages/Category'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  const user = useSelector(state => state.user.userData)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [isLoggedIn])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/recipe/:id' element={<SingleRecipe />} />
          <Route path='/category' element={<Category />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
