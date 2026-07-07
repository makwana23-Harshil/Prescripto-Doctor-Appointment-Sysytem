import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/Admin_Context'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      //for storing the in the backend use this names like image 
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      //console log for data
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })
      //api call for store data into database
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)//using this the doctor add to database message show after added

        // after add to database clear the form 
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')

      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 lg:px-15 w-full rounded-2xl bg-primary shadow-[0_0_25px_rgba(95,101,255,12)] '>
      <p className='mb-3 mt-4 text-lg font-semibold text-center'>ADD Doctor</p>

      <div className='bg-white px-8 py-8 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} className='w-16 bg-gray-100 rounded-full cursor-pointer border border-white-800' />
          </label>

          <input type='file' id='doc-img' hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p className='text-black font-semibold'>upload Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border  text-white-800 rounded px-3 py-2 ' type='text' placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Eamil' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='Fees' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Speciality</p>
              <select name='' id='' onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Education Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p className='text-black font-semibold'>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type='text' placeholder='address-1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type='text' placeholder='address-2' required />
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2 text-black font-semibold'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' rows={5} required />
        </div>

        <button type='submit' className='bg-black text-white px-10 py-3 font-semibold mt-4 rounded-full hover:bg-primary hover:text-black transition-all'>ADD Doctor</button>
      </div>

    </form>
  )
}

export default AddDoctor