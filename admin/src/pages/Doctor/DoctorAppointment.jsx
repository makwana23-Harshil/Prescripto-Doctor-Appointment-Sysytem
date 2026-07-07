import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/Doctor_Context'
import { AppContext } from '../../context/App_Context'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    getAppointments()
  }, [dToken])


  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <p className='mb-3 text-lg font-medium'>All Appointments </p>
      <div className='w-full h-full flex flex-col gap-4 p-4 border border-gray-300 rounded-lg max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='w-full grid grid-cols-7 gap-0 p-2 border-b border-gray-300 max-sm:hidden '>
          <p className='font-medium'>Sr.no</p>
          <p className='font-medium'>Patient Name</p>
          <p className='font-medium'>Payment</p>
          <p className='font-medium'>Age</p>
          <p className='font-medium'>Date & Time</p>
          <p className='font-medium'>Fees</p>
          <p className='font-medium'>Action</p>
        </div>
        {
          appointments.map((item, index) => (
            <div key={index} className='w-full grid grid-cols-7 gap-4 p-2 border-b border-gray-300 items-center max-sm:grid-cols-1 max-sm:gap-2 hover:bg-gray-200 transition-all'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='rounded-full w-10 h-10' />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>{item.payment ? 'online' : 'Cash'}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-800 font-semibold'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-800 font-semibold'>Completed</p>
                    : <div className='flex items-center gap-2'>
                      <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' />
                      <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} className='w-10 cursor-pointer' />
                    </div>
              }
            </div>
          ))
        }
      </div>
    </div> 
  )
}

export default DoctorAppointment