import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Top_Doctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 py-20 text-gray-900 px-4 sm:px-0'>

            <h1 className='text-3xl font-medium text-gray-900'>Top Doctors To Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors</p>

            <div className=' grid grid-cols-1 sm:grid-cols-2 px-0 lg:grid-cols-4 gap-4 gap-y-6 w-full pt-5 px-3 '>
                {doctors.slice(0, 8).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={index} className='border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>

                        <img className='bg-blue-50' src={item.image} alt={item.name} />

                        <div className='p-3'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'Not Available '}</p>
                            </div>
                            <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                            <p className='text-md text-gray-600'>{item.speciality}</p>
                        </div>

                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-primary text-white px-12 py-3 rounded-lg mt-10'>More</button>
        </div>
    )
}

export default Top_Doctors