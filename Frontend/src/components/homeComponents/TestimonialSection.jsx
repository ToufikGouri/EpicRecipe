import React from 'react'
import TestimonialCard from './TestimonialCard'

const TestimonialSection = () => {

    const data = [
        {
            image: "https://st.depositphotos.com/1715570/2652/i/450/depositphotos_26521259-stock-photo-portrait-of-a-handsome-young.jpg",
            username: "Samuel William",
            msg: "It's amazing and I love it."
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOf5ft2Iv7lJKeW32sNljZDnhwitc0kZ-11XiCJC8NsO8EHpbllZp9-GO0HXMS5eB3Bjg&usqp=CAU",
            username: "Lara White",
            msg: "The perfect place for discovering new dishes."
        },
        {
            image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
            username: "Jane Smith",
            msg: "This site made me fall in love with cooking again."
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
            username: "Mike Johnson",
            msg: "Simply outstanding. The recipes are so easy to follow."
        },
        {
            image: "https://thumbs.dreamstime.com/b/professional-business-portrait-black-woman-pen-to-sign-png-isolated-transparent-background-corporate-fashion-284249788.jpg",
            username: "Emily Brown",
            msg: "My go-to site for quick and tasty meals!"
        }, 
        {
            image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            username: "Anna Wilson",
            msg: "I've found my new favorite recipe here!"
        },
        {
            image: "https://media.istockphoto.com/id/1191193169/photo/portrait-of-a-confident-young-woman-at-the-park.jpg?b=1&s=612x612&w=0&k=20&c=StRxOnMZGBl3714zvEc2vHKJStEkgIfAcpo3zZ8UZ08=",
            username: "Sophia Moore",
            msg: "Amazing variety of recipes. Highly recommend!"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQwO_iDiXZTNCnpQohksKuNFnurdT7K8eG3urKbIORtrMWTkJbnzoz0R9GB7oXVsT-Bb0&usqp=CAU",
            username: "Olivia Clark",
            msg: "I can't believe how easy it is to cook delicious meals now!"
        },
    ]

    return (
        <>
            <section className='m-2 my-20 sm:mx-20'>
                <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase text-center font-bold'>What people say about us</h1>

                <div className='mt-10 py-2 sm:mt-20 grid grid-cols-2 md:grid-cols-4 max-md:grid-rows-4 overflow-hidden gap-2 sm:gap-6'>
                    {data.map((val, ind) =>
                        <TestimonialCard key={ind} image={val.image} username={val.username} msg={val.msg} />
                    )}
                </div>
            </section>
        </>
    )
}

export default TestimonialSection