import React from 'react'
import useTitle from '../components/useTitle'

const NotFound = () => {
  
  useTitle("404")
  
  return (
    <>
      <section className='h-screen w-full flex flex-col justify-center items-center'>
        <h1 className='text-6xl'>404</h1>
        <h1 className='text-2xl'>Page not found</h1>
      </section>
    </>
  )
}

export default NotFound