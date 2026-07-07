import React, { useContext } from 'react'
import { AdminContext } from '../context/Admin_Context'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/Doctor_Context'


const Sidebar = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  
    return (
    <div className='min-h-screen bg-white border-r border-gray-600'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold':''} hover:bg-primary hover:text-black transition-all`}>
                    <img src={assets.home_icon}/>
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={'all-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold ':''} hover:bg-primary hover:text-black transition-all`}>
                    <img src={assets.appointment_icon}/>
                    <p>Appointmenrs</p>
                </NavLink>

                <NavLink to={'/add-doctor'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold':''} hover:bg-primary hover:text-black transition-all`}>
                    <img src={assets.add_icon}/>
                    <p>ADD Doctor</p>
                </NavLink>

                <NavLink to={'/doctor-list'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold':''} hover:bg-primary hover:text-black transition-all`}>
                    <img  src={assets.people_icon}/>
                    <p>Doctor List</p>
                </NavLink>
            </ul>
        }

        {/* doctor sidebar */}
         {
            dToken && <ul className='text-[#515151] mt-5'>
                <NavLink to={'/doctor-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold':''} hover:bg-primary hover:text-black transition-all`}>
                    <img src={assets.home_icon}/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink to={'doctor-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold ':''} hover:bg-primary hover:text-black transition-all`}>
                    <img src={assets.appointment_icon}/>
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink to={'doctor-profile'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 text-primary border-primary font-semibold':''} hover:bg-primary hover:text-black transition-all`}>
                    <img  src={assets.people_icon}/>
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }

    </div>
  )
}

export default Sidebar