import React from 'react'
import ER_Logo from "../assets/ER_Logo.svg"
import HeroImage from "../assets/AboutAssets/Hero img.png"
import AwardImage1 from "../assets/AboutAssets/Award img 1.png"
import AwardImage2 from "../assets/AboutAssets/Award img 2.png"
import AwardImage3 from "../assets/AboutAssets/Award img 3.png"
import Footer from '../components/Footer'
import useTitle from '../components/useTitle'

const About = () => {

  useTitle("About")
  
  const awardsData = [
    {
      title: "Best Recipes",
      year: "2023",
      image: AwardImage1,
    },
    {
      title: "Fans Favorite",
      year: "2022",
      image: AwardImage2,
    },
    {
      title: "Kitchen Masters",
      year: "2020",
      image: AwardImage3,
    },
  ]

  return (
    <>
      <section>

        {/* Hero section */}
        <section>
          <div className={`mt-[63px] h-[20vh] w-full bg-no-repeat bg-contain bg-center`} style={{ backgroundImage: `url(${ER_Logo})` }}></div>
          <div className="m-2 my-10 sm:mx-20">
            <p className='mt-4 sm:text-xl max-sm:text-justify'>Home cooks are our heroes—it's as simple as that. EpicRecipes is a community built by and for kitchen experts: The cooks who will dedicate the weekend to a perfect beef bourguignon but love the simplicity of a slow-cooker rendition, too. The bakers who labor over a showstopping 9-layer cake but will just as happily doctor boxed brownies for a decadent weeknight dessert. The entertainers who just want a solid snack spread, without tons of dirty dishes at the end of the night.</p>
            <p className='mt-4 sm:text-xl max-sm:text-justify'>Most importantly, EpicRecipes connects home cooks with their greatest sources of inspiration — other home cooks. We're the world's leading digital food brand, and that inspires us to do everything possible to keep our community connected. Sixty-million home cooks deserve no less.</p>
          </div>
        </section>

        {/* Mid section */}
        <section className='m-2 my-10 sm:mx-20'>

          <div className="relative max-sm:text-sm h-[60vh] sm:h-[80vh] w-3/4 m-auto flex justify-between">
            <div className={`h-full w-full absolute top-0 bg-no-repeat bg-contain bg-center`} style={{ backgroundImage: `url(${HeroImage})` }}></div>

            <span className='text-center flex flex-col justify-between'>
              <div className='min-w-28 sm:min-w-40'><div className="text-2xl sm:text-4xl rounded-xl py-2 bg-primaryRed text-white">280+</div>Recipes</div>
              <div className='min-w-28 sm:min-w-40'><div className="text-2xl sm:text-4xl rounded-xl py-2 bg-primaryRed text-white">4+</div>Years of experience</div>
            </span>
            <span className='text-center flex flex-col justify-between'>
              <div className='min-w-28 sm:min-w-40'><div className="text-2xl sm:text-4xl rounded-xl py-2 bg-primaryRed text-white">36+</div>Categories</div>
              <div className='min-w-28 sm:min-w-40'><div className="text-2xl sm:text-4xl rounded-xl py-2 bg-primaryRed text-white">8+</div>Awards</div>
            </span>
          </div>

        </section>

        {/* Awards section */}
        <section className='m-2 my-10 sm:mx-20 text-center'>
          <h1 className='text-primaryBlue text-2xl sm:text-4xl uppercase font-bold'>Awards</h1>
          <p className='mt-4 sm:text-xl'>Some of our recent awards and <br /> recognition all over the word and <br /> among our EpicRecipes Family.</p>

          <div className='my-20 grid grid-cols-1 sm:grid-cols-3 gap-5 place-items-center'>
            {awardsData.map((val, ind) =>
              <div key={ind}>
                {/* <img src={val.image} alt={val.title} className='size-40 border border-black object-cover' /> */}
                <div className={`size-40 bg-no-repeat bg-center bg-contain`} style={{ backgroundImage: `url(${val.image})` }}></div>
                <h1 className='text-xl font-bold'>{val.title}</h1>
                <p>{val.year}</p>
              </div>
            )}
          </div>

        </section>

        {/* Footer section */}
        <Footer />

      </section>
    </>
  )
}

export default About