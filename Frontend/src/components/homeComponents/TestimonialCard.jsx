import React from 'react'

const TestimonialCard = ({ image, username, msg }) => {

    const fallBackImage = "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"

    return (
        <>
            <div className='min-h-32 p-4 rounded-xl bg-white shadow-md'>
                <div className='mb-3 flex items-center'>
                    <img src={image}
                        alt={username} loading='lazy'
                        className='size-8 object-cover object-center rounded-full'
                        onError={(e) => { e.target.onerror = null; e.target.src = fallBackImage }}
                    />
                    <h1 className='font-bold text-sm sm:text-xl ms-2 capitalize'>{username}</h1>
                </div>
                <p className='max-sm:text-sm'>{msg}</p>
            </div>
        </>
    )
}

export default TestimonialCard