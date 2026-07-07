import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData, setUserData } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)
    //const [token,setToken] =useState(true)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        // change add this to line 
        setUserData(false);
        navigate('/');
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray'>

            <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>About </li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            <div className='flex item-center gap-4'>
                {
                    token && userData
                        ? <div className='flex item-center gap-2 cursor-pointer group relative'>

                            <img className='w-8 rounded-full' src={userData.image || assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('my_profile')} className='hover:text-black cursor-pointer'>My profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Log out</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                            Create account
                        </button>
                }

                {/*--------------mobile menus---------------*/}
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='' />

                <div className={`${showMenu ? 'fixed inset-0' : 'hidden'} md:hidden z-20 overflow-y-auto bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt='' />
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt='' />
                    </div>

                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About us</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT US</p></NavLink>
                    </ul>

                    {
                        token && (
                            <div className='mt-6 border-t px-5 pt-5'>
                                <div className='flex items-center gap-3 mb-4'>
                                    <img className='w-10 rounded-full' src={assets.profile_pic} alt='' />
                                    <div>
                                        <p className='font-semibold text-gray-800'>My Account</p>
                                        <p className='text-sm text-gray-500'>Logged in</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 text-base text-gray-700'>
                                    <button onClick={() => { navigate('/my_profile'); setShowMenu(false) }} className='text-left hover:text-black'>My Profile</button>
                                    <button onClick={() => { navigate('/my_appointments'); setShowMenu(false) }} className='text-left hover:text-black'>My Appointments</button>
                                    <button onClick={() => { setToken(false); setShowMenu(false) }} className='text-left hover:text-black'>Log out</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar