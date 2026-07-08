import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const My_Profile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try{
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data} =await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)

      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const userAddress = userData && typeof userData.address === 'string'
    ? JSON.parse(userData.address)
    : (userData?.address || { line1: '', line2: '' })

  if (!userData) {
    return (
      <div className='flex items-center justify-center min-h-[500px]'>
        <p className='text-lg font-semibold text-gray-500 animate-pulse'>Loading Profile Data...</p>
      </div>
    )
  }

  return userData && (

    <div className='max-w-4xl mx-auto p-6 shadow-[0_0_25px_rgba(95,111,255,0.12)] rounded-2xl space-y-6  bg-primary'>
      <div className='flex flex-col items-center justify-center p-8 rounded-2xl bg-primary'>
        {
          isEdit 
          ? <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img src={image ? URL.createObjectURL(image):userData.image} className='w-36 rounded opacity-75'/>
              <img src={image ? '':assets.upload_icon}  className='w-10 absolute bottom-12 right-12'/>
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file'  id='image' hidden/>
          </label>
          : <img className='w-32 h-32 rounded-full object-cover border border-white' src={userData.image} alt='profile' />
        }
       
        {
          isEdit
            ? <input
              className='mt-4 border border-gray-300 rounded-md p-2 text-xl font-semibold text-center'
              type='text'
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
            : <p className='mt-4 text-2xl font-semibold text-white'>{userData.name}</p>
        }
      </div>

      <div className='p-6 mt-6 shadow-[0_0_25px_rgba(95,111,255,0.12)] rounded-2xl bg-white'>
        <p className='text-lg font-semibold mb-4'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Email Id:</p>
            {
              isEdit
                ? <input
                  className='w-full border border-gray-200 rounded-md p-2 mt-1'
                  type='text'
                  value={userData.email}
                  onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                />
                : <p className='mt-1'>{userData.email}</p>
            }
          </div>
          <div>
            <p className='text-sm text-gray-500'>Phone no.</p>
            {
              isEdit
                ? <input
                  className='w-full border border-gray-300 rounded-md p-2 mt-1'
                  type='text'
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                />
                : <p className='mt-1'>{userData.phone}</p>
            }
          </div>
          <div className='md:col-span-2'>
            <p className='text-sm text-gray-500'>Address:</p>
            {
              isEdit
                ? <div className='mt-1 space-y-2'>
                  <input
                    className='w-full border border-gray-300 rounded-md p-2'
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    value={userData.address.line1}
                    type='text'
                  />
                  <input
                    className='w-full border border-gray-300 rounded-md p-2'
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    value={userData.address.line2}
                    type='text'
                  />
                </div>
                : <p className='mt-1'>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
            }
          </div>
        </div>
      </div>

      <div className='p-6 mt-6 shadow-[0_0_25px_rgba(95,111,255,0.12)] rounded-2xl bg-white'>
        <p className='text-lg font-semibold mb-4'>Basic information</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Gender</p>
            {
              isEdit
                ? <select className="w-full border border-gray-300 rounded-md p-2 mt-1" value={userData.gender}
                    onChange={(e) => {
                  console.log("Selected:", e.target.value);
                  setUserData(prev => ({...prev,
                    gender: e.target.value
                  }));
                  }}>
                  <option value="Not selected">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                : <p className='mt-1'>{userData.gender}</p>
            }
          </div>
          <div>
            <p className='text-sm text-gray-500'>Birthday:</p>
            {
              isEdit
                ? <input
                  className='w-full border border-gray-300 rounded-md p-2 mt-1'
                  type='date'
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
                : <p className='mt-1'>{userData.dob}</p>
            }
          </div>
        </div>
      </div>

      <div className='mt-6 flex justify-end'>
        {
          isEdit
            ? <button className='bg-primary text-white px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all' onClick={updateUserProfileData}>Save</button>
            : <button className='bg-primary text-white px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default My_Profile
