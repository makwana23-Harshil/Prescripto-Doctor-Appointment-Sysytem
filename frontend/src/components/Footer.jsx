import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
                {/*left section*/}
                <div className=''>
                    <img className='mb-5 w-40' src={assets.logo} alt='' />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto helps you book trusted doctors, manage appointments, and access quality healthcare services with ease from anywhere.</p>


                </div>

                {/*middle section*/}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li><Link to='/' className='hover:text-primary'>Home</Link></li>
                        <li><Link to='/about' className='hover:text-primary'>About us</Link></li>
                        <li><Link to='/contact' className='hover:text-primary'>Contact us</Link></li>
                        <li><Link to='/privacy-policy' className='hover:text-primary'>Privacy policy</Link></li>
                    </ul>

                </div>

                {/*right section*/}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 8938420000</li>
                        <li>Prescripto@yaahoo.com</li>
                    </ul>
                </div>
            </div>
            <div>
                {/* copy right*/}
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2026@ Prescripto - ALL Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer