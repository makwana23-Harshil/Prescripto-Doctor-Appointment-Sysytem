import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/Admin_Context'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailablity} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-center font-medium text-lg'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div key={index} className='group border border-indigo-200 rounded-xl max-w-60 overflow-hidden cursor-pointer"'>
              <img src={item.image} alt='' className='bg-primary group-hover:bg-indigo-50 transition-all duration-500'/>
              
              <div className='p-2 bg-indigo-50 group-hover:bg-primary transition-all duration-500"'>
                <p className='text-neutral-800 font-semibold group-hover:text-white'>{item.name}</p>
                <p className='text-zinc-600 text-sm group-hover:text-white'>{item.speciality}</p>

                <div className='flex gap-1 mt-2 items-center text-sm'>
                  <input onChange={()=>changeAvailablity(item._id)} type='checkbox' checked={item.available}/>
                  <p className='text-primary group-hover:text-white'>Available</p>

                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList