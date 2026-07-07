import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadRazorpayScript } from '../utils/loadScript'


const My_Appointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId)
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
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

  //for USING THE PAYMENT FEATURE ADD THE YOUR KEY ND SECRET KEY FROM THE WEBSITE AND PASTE IT TO BACKEND .ENV
  const initPay = (order, appointmentId) => {
    console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("================ RAZORPAY RESPONSE ================");
        console.log("data", response)
        console.log("==================================================");

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })

          console.log("================ BACKEND API RESPONSE ================");
          console.log("Success status:", data.success);
          console.log("Server message:", data.message);
          console.log("======================================================");

          if (data.success) {
            getUserAppointments()
            toast.success("Payment verified successfully!")
            navigate('/my-appointments')
          }
          else {
            toast.success("Payment not complted")
          }
        } catch (error) {
          console.log(error)
          console.error("❌ CRITICAL API FAILURE:", error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load.")
        return
      }

      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })

      if (data.success) {
        initPay(data.order)
      } else {
        // CHANGED: Show the actual backend message string
        toast.error(data.message || "Razorpay information is not complete")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }

    // Silently preload the script when the component mounts so it's ready instantly
    const preloadScript = async () => {
      try {
        await loadRazorpayScript();
      } catch (err) {
        console.log("Silent preload failed:", err);
      }
    };

    // Use requestIdleCallback if available, otherwise timeout slightly
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadScript);
    } else {
      setTimeout(preloadScript, 1000);
    }
  }, [token]);


  return (
    <div className='max-w-6xl mx-auto p-6'>
      <p className='text-2xl font-semibold mb-6'>My Appointments</p>
      <div className='space-y-4'>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row items-center md:items-start gap-4 border rounded-2xl p-4 shadow-[0_0_25px_rgba(95,111,255,0.12)]'>
            <div >
              <img className='w-32 bg-primary rounded-xl ' src={item.docData.image} alt={item.name} />
            </div>

            <div className='flex-1'>
              <p className='text-lg font-semibold'>{item.docData.name}</p>
              <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
              <p className='mt-2 font-medium'>Address</p>
              <p className='text-sm text-gray-600'>{item.docData.address.line1}</p>
              <p className='text-sm text-gray-600'>{item.docData.address.line2}</p>
              <p className='mt-2 text-sm'><span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>

            <div className='flex gap-2 md:flex-col w-full md:w-auto'>
              {
                !item.cancelled &&
                item.payment &&
                !item.isCompleted && (
                  <button
                    disabled
                    className="w-full md:w-48 py-2 rounded-full bg-green-600 text-white cursor-not-allowed font-medium"
                  >
                    ✓ Payment Completed
                  </button>
                )
              }


              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="w-full md:w-48 py-2 rounded-full bg-primary text-white hover:bg-green-600 transition-all duration-300"
                >
                  Pay Online
                </button>
              }

              {
                !item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointments</button>}

              {
                item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
              }
              {
                item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
              }

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default My_Appointments
