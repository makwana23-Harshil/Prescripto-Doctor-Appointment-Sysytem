import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/Admin_Context'
import { DoctorContext } from '../context/Doctor_Context';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    
    const navigate = useNavigate()
    const logout = () => {
        if (aToken) {
            localStorage.removeItem("adminToken");
            setAToken("");
        }

        if (dToken) {
            localStorage.removeItem("doctorToken");
            setDToken("");
        }

        navigate("/", { replace: true });
    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center text-xs gap-2'>
                <img src={assets.admin_logo} className='w-36 cursor-pointer' />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-primary text-black px-6 py-3 font-semibold mt-1 rounded-full hover:bg-black hover:text-white transition-all'>Logout</button>
        </div>
    )
}

export default Navbar