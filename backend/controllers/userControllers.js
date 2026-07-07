import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'

//api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })

        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        //add the to database and encrpt and decrpt the password or hashing password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //store password into the database
        const userData = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

        console.log("Registered user:", user._id);   

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        console.log("Login user found:", user?._id);   // <-- add here
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

//api to gett user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
        console.log("Fetching profile for userId:", userId);   // <-- add here
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
//to update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            // upload image to cloundinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
            return res.json({ success: true, message: "Profile updated" })
        }

        return res.json({ success: true, message: "Profile updated successfully" })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
// api to book appoinmemnts 

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        const existingUserAppointment = await appointmentModel.findOne({
            userId,
            slotDate,
            slotTime,
            cancelled: { $ne: true } // Prevents booking conflicts unless the old one was cancelled
        })

        if (existingUserAppointment) {
            return res.json({ success: false, message: 'You already have an appointment booked at this time' })
        }

        if (!docData) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not Available' })
        }

        let slots_booked = docData.slots_booked
        //cheking for slots avaiablity
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Doctor not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)

            }
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData = {
            userId, docId,
            userData, docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docdata
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        return res.json({ success: true, message: 'Appointments booked' })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}

//api to get user appointments for frontend my-appointments.jsx
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}
// APi for cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        //verfiry appointment of user
        if (appointmentData.userId !== userId) {
            return res.json({ success, message: 'Unathorized action' })

        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // releasing doctor slots
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })


    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// api to verify the  payment of razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }

        // Fix: Ensure the amount exists and fallback safely if it's missing or zero
        const rawAmount = Number(appointmentData.amount) || 0
        if (rawAmount <= 0) {
            return res.json({ success: false, message: "Invalid appointment fee amount recorded" })
        }

        const options = {
            amount: rawAmount * 100, // Converts to subunits (paise)
            currency: 'INR',
            receipt: appointmentId.toString()
            
        }

        const order = await razorpayInstance.orders.create(options)
        return res.json({ success: true, order })
        console.log("Receipt:", orderInfo.receipt);
        console.log("Appointment ID:", appointmentId);

    } catch (error) {
        console.log("Razorpay Order Creation Error:", error)
        // Fix: Ensure the catch block sends the real failure notice back to frontend Axios
        return res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log("order inforamtion", orderInfo)

        const signStr = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(signStr.toString())
            .digest('hex')

        if (expectedSignature === razorpay_signature) {

            const appointmentId = orderInfo.receipt;

            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: "Payment verified successfully" })
        } else {
            return res.json({ success: false, message: "Payment verification failed" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }