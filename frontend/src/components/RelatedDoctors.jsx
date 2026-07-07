import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { doctors } from '../assets/assets'

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors: contextDoctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDocs(doctorsData)
    }
  }, [contextDoctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 py-20 text-gray-900 px-4 sm:px-6'>
      <h1 className='text-3xl font-medium text-gray-900'>Top Doctors To Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl pt-5'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md'
          >
            <img className='w-full h-56 object-cover bg-blue-50' src={item.image} alt={item.name} />

            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available '}</p>
              </div>
              <p className='mt-2 text-lg font-semibold text-gray-900'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className='bg-primary text-white px-12 py-3 rounded-lg mt-10 hover:opacity-90 transition-all'
      >
        More
      </button>
    </div>
  )
}

export default RelatedDoctors