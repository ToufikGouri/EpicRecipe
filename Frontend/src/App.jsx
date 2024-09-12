import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getDefaultProfiles, getUserData } from './redux/userSlice'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Recipes from './pages/Recipes'
import SingleRecipe from './pages/SingleRecipe'
import Category from './pages/Category'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SingleCategory from './pages/SingleCategory'
import Account from './pages/account/Account'
import Profile from './pages/account/Profile'
import PrivateRoutes from './components/PrivateRoutes'
import ChangePassword from './pages/account/ChangePassword' 
import AddRecipe from './pages/account/AddRecipe'

function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getDefaultProfiles())
  }, [isLoggedIn])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:id' element={<SingleRecipe />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:category' element={<SingleCategory />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/account' element={<Account />}>
              <Route index element={<Profile />} /> {/* Index is used to specify default child sub route but path need to be specified explicitely */}
              <Route path='profile' element={<Profile />} />
              <Route path='changepassword' element={<ChangePassword />} />
              <Route path='addrecipe' element={<AddRecipe />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
