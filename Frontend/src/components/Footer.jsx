import React from 'react'
import ER_Logo from "../assets/ER_Logo.svg"
import { HeartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {

    const icons = {
        githubIcon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
        </svg>,
        linkedinIcon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
        </svg>,
        instagramIcon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z"></path>
        </svg>
    }

    return (
        <>
            <footer className='min-h-60 flex max-sm:flex-col-reverse text-white bg-primaryBlue'>
                <div className="leftPart max-sm:my-6 sm:w-2/4 grid place-items-center gap-4">
                    <div className="socials w-full text-xl flex justify-center">
                        <p className='me-4'>Follow us on</p>
                        <Link to="https://github.com/ToufikGouri" target='_blank' className='cursor-pointer mx-1 fill-white hover:fill-secondaryGrey'>{icons.githubIcon}</Link>
                        <Link to="https://www.linkedin.com/in/toufikgouri" target='_blank' className='cursor-pointer mx-1 fill-white hover:fill-secondaryGrey'>{icons.linkedinIcon}</Link>
                        <Link to="https://www.instagram.com/itz_mtg_" target='_blank' className='cursor-pointer mx-1 fill-white hover:fill-secondaryGrey'>{icons.instagramIcon}</Link>
                    </div>

                    <img src={ER_Logo} alt="EpicRecipes" className='w-60 sm:w-80' />
                    <p className='font-bold group flex'>Developed with&nbsp; <HeartIcon color='red' fill='red' /> &nbsp;by
                        <a href="https://toufikgouri.netlify.app" target='_blank' className='group-hover:text-primaryRed'>&nbsp; Toufik Gouri</a>
                    </p>
                </div>
                <div className="rightPart max-sm:m-6 sm:w-2/4">
                    <ul className='sm:py-8 sm:text-xl grid grid-cols-2 gap-3'>
                        <li><Link to="/recipes">All Recipes</Link></li>
                        <li><Link to="/account/profile">My Account</Link></li>
                        <li><Link to="/category">By Category</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/account/saved">Saved Recipes</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/account/addrecipe">Add Recipe</Link></li>
                        <li><Link to="mailto:toufikgouri2@gmail.com" target='_blank'>Contact</Link></li>  
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer