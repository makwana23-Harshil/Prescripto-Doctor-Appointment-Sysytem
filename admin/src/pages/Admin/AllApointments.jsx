import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/Admin_Context'
import { useEffect } from 'react'
import { AppContext } from '../../context/App_Context'
import { assets } from "../../assets/assets";


const AllAppointments = () => {
  const{aToken,appointments,getAllappointments,cancelAppointment} = useContext(AdminContext)
  const { calculateAge, slotDateFormat,currency } = useContext(AppContext)
  useEffect (()=>{
    if(aToken){
      getAllappointments()

    }
  },[aToken])

  return (
    <div className='w-full max-w-full'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded-md text-sm  max-h-[80vh] overflow-y-auto min-h-[60vh] m-3'>
        <div className='grid grid-cols-7 gap-3 p-3 border-b font-medium bg-indigo-100 sticky top-0 z-10'>
          <p>#</p>
          <p>patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'><img className='w-8 rounded-full border border-black-500' src={item.userData.image} alt=""/>
             <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p className='max-sm:hidden'>{slotDateFormat(item.slotDate)} ,{item.slotTime}</p>
            <div className='flex item-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt=""/>
             <p>{item.docData.name}</p>
            </div>
            <p>{currency }{item.amount}</p>
            {
              item.cancelled ? <p className='text-red-500 font-medium text-xs'>Cancelled</p> 
              :item.isCompleted ?
               <p className='text-green-500 font-medium text-xs'>Completed</p>
               :<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer'/>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments