import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center mb-25  md:flex-row gap-18 text-sm '>
        
        <img className='w-full max-w-[360px] rounded-xl shadow-[0_0_25px_rgba(95,111,255,0.12)]' src= {assets.contact_image} alt=''/>
        
        <div className='flex flex-col justify-center item-start gap-5  '>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>53427 Willms Station <br/>Suite 350, USA</p>
          <p className='text-gray-500'>Tel: +91 433499349999 <br/> Email: support@prescripto.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers At PRESCRIPTO</p>
          <p className='text-gray-500'>Join our team and help make healthcare easier, <br/> more compassionate, and more accessible.</p>
          
          <button className='border border-black rounded-sm px-6 py-4 text-md hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        
        </div>
      
      </div>
    
    </div>
  )
}

export default Contact