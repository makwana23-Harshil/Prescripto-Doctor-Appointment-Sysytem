import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from '../models/userModel.js'


const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.files?.image?.[0]
        console.log("BODY:", req.body)
        console.log("FILES:", req.files)

        console.log("name:", name);
        console.log("email:", email);
        console.log("password:", password);
        console.log("speciality:", speciality);
        console.log("degree:", degree);
        console.log("experience:", experience);
        console.log("about:", about);
        console.log("fees:", fees);
        console.log("address:", address);
        console.log("imageFile:", imageFile);

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing details" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "password must be at least 8 characters" })
        }
        //incrpt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            Date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)

        await newDoctor.save()
        res.json({ success: true, message: 'doctor added to database' })

    }
    //upload the image to cloudinary
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//APi for the admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                email+password,
                process.env.JWT_SECRET || 'fallback-secret'
            )
            return res.json({ success: true, message: "Login successful", token })
        }

        return res.status(401).json({
            success: false,
            message: "Invalid Credentials"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
//api to get all doctor list fro admin panel
const allDoctor = async(req,res) =>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
//api to get all appoinment list
const appointmentsAdmin = async(req,res) =>{
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
//api for appointemnt cancels
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
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
//api to get dashboard data for admin
const adminDashboard = async (req, res) => {
    try{
        const Doctors = await doctorModel.find({})
        const users= await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors:Doctors.length,
            patients:users.length,
            appointments:appointments.length,
            latestAppointments:appointments.slice(0,5).reverse()
        }

        res.json({success:true,dashData})
    }

    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }   
}
export { addDoctor, loginAdmin , allDoctor,appointmentsAdmin, appointmentCancel, adminDashboard};