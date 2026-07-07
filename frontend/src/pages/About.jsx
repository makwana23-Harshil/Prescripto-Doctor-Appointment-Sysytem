import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-6 md:gap-12 shadow-[0_0_25px_rgba(95,111,225,0.288)] rounded-xl overflow-hidden p-4 md:p-0'>
        <img
          className='w-full max-w-[400px] mx-auto md:mx-0 object-cover'
          src={assets.about_image}
          alt='About us'
        />
        <div className='flex flex-col justify-center gap-4 md:gap-6 w-full md:w-2/4 text-sm text-gray-600 text-center md:text-left'>
          <p>
            At Prescripto, we believe quality healthcare should be simple, fast, and accessible for everyone.
          </p>
          <p>
            Our platform connects patients with experienced doctors, helping you book appointments, explore specialties, and stay informed about your care journey.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            We aim to make trusted healthcare available to every person, whenever and wherever it is needed.
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4 md:gap-6'>
        <div className='border m-0 md:m-5 px-5 md:px-12 py-8 sm:py-12 rounded flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>We simplify appointment scheduling and follow-ups so you spend less time waiting and more time healing.</p>
        </div>

        <div className='border m-0 md:m-5 px-5 md:px-12 py-8 sm:py-12 rounded flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience</b>
          <p>Book visits, check doctor availability, and manage your care from anywhere with just a few clicks.</p>
        </div>

        <div className='border m-0 md:m-5 px-5 md:px-12 py-8 sm:py-12 rounded flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization</b>
          <p>We tailor recommendations and care options to match your needs, preferences, and health goals.</p>
        </div>
      </div>
    </div>
  )
}

export default About