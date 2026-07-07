import React, { useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/Doctor_Context'
import { AppContext } from '../../context/App_Context'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Profile Card */}
        <div className="bg-gray-80 rounded-3xl shadow-lg overflow-hidden transition-all duration-300">

          <div className="grid md:grid-cols-3 border border-gray-500">

            {/* Left Side */}
            <div className="bg-white flex flex-col items-center justify-center p-8 ">

              <img
                src={profileData.image}
                alt=""
                className="w-64 h-64 object-cover bg-primary rounded-2xl shadow-lg hover:scale-105 duration-300"
              />

              <button
                className={`mt-6 px-5 py-2 rounded-full text-white font-medium transition-all duration-300 ${profileData.available
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
                  }`}>
                {profileData.available ? "Available" : "Unavailable"}
              </button>
            </div>

            {/* Right Side */}
            <div className="md:col-span-2 p-10">

              {/* Name */}
              <h1 className="text-4xl font-bold text-gray-800">
                {profileData.name}
              </h1>

              {/* Degree */}
              <div className="flex flex-wrap items-center gap-3 mt-3">

                <span className="text-gray-600">
                  {profileData.degree} • {profileData.speciality}
                </span>

                <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {profileData.experience}
                </span>

              </div>

              {/* About */}
              <div className="mt-8">

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  About Doctor
                </h2>

                <p className="text-gray-600 leading-7">
                  {profileData.about}
                </p>

              </div>

              {/* Information Cards */}

              <div className="grid sm:grid-cols-2 gap-5 mt-8">

                {/* Fees */}

                <div className="bg-gray-50 rounded-xl p-5 border hover:shadow-md duration-300">

                  <p className="text-gray-500 text-sm">
                    Appointment Fee
                  </p>

                  <h3 className="text-2xl font-bold text-primary mt-2">
                    {currency}

                    {isEdit ? (
                      <input type="number" value={profileData.fees}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value, }))}
                        className="ml-2 border rounded px-2 py-1 w-24"
                      />)
                      : (profileData.fees)}
                  </h3>
                </div>
                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-5 border hover:shadow-md duration-300">

                  <p className="text-gray-500 text-sm">
                    Address
                  </p>

                  {isEdit ? (
                    <>
                      <input
                        className="border rounded w-full p-2 mt-2"
                        value={profileData.address.line1}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev, address: { ...prev.address, line1: e.target.value, },
                          }))
                        }
                      />

                      <input className="border rounded w-full p-2 mt-3" value={profileData.address.line2}
                        onChange={(e) => setProfileData((prev) => ({
                          ...prev, address: { ...prev.address, line2: e.target.value, },
                        }))
                        }
                      />
                    </>
                  ) : (
                    <>
                      <p className="mt-2">{profileData.address.line1}</p>
                      <p>{profileData.address.line2}</p>
                    </>
                  )}

                </div>

              </div>

              {/* Bottom */}

              <div className="flex flex-wrap justify-between items-center mt-10">

                <div className="flex items-center gap-3">

                  <input type="checkbox" checked={profileData.available} onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available, }))
                  }
                    className="w-5 h-5 accent-primary"
                  />

                  <label className="text-gray-700 font-medium">
                    Available for Appointment
                  </label>

                </div>

                {isEdit ? (
                  <button
                    onClick={updateProfile}
                    className="mt-4 md:mt-0 bg-primary text-white px-8 py-3 rounded-xl hover:scale-105 hover:shadow-lg duration-300"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="mt-4 md:mt-0 border-2 border-primary text-primary px-8 py-3 rounded-xl hover:bg-primary hover:text-white duration-300"
                  >
                    Edit Profile
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default DoctorProfile