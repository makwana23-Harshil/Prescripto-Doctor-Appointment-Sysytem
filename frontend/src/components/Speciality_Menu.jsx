import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const Speciality_menu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

            <div className='w-full pt-5'>
                <div className='flex flex-col gap-4 sm:flex-row sm:justify-center sm:flex-wrap sm:overflow-visible'>
                    {specialityData.map((item, index) => (
                        <Link
                            onClick={() => scrollTo(0, 0)}
                            className='flex items-center gap-3 rounded-lg p-3 text-xs cursor-pointer hover:translate-y-[-4px] transition-all duration-500 sm:flex-col sm:gap-0 sm:p-0'
                            key={index}
                            to={`/doctors/${item.speciality}`}
                        >
                            <img className='w-12 sm:w-24 mb-0 sm:mb-2' src={item.image} alt="" />
                            <p>{item.speciality}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Speciality_menu