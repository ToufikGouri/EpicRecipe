import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Recipes from './pages/Recipes'
import SingleRecipe from './pages/SingleRecipe'
import Category from './pages/Category'

function App() {

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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
