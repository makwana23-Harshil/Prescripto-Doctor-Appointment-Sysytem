import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity changed' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }

}

//all doctor list for the frontend
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']) // remove the email and password for the frontend

        res.json({ success: true, doctors })

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }

}
//api for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            return res.json({ success: true, message: 'Login Success', token })
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
//api to get all doctor appointments for the doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        //const docId = req.body
        const docId = req.docId
        const appointments = await appointmentModel.find({ docId })
        // const appointments = await appointmentModel.find({});
        console.log(appointments);

        res.json({ success: true, appointments })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
//api to mark appointment complterd
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        console.log("Doctor ID from token:", docId);
        console.log("Appointment ID:", appointmentId);

        const appointmentData = await appointmentModel.findById(appointmentId)

        console.log("Appointment Data:", appointmentData);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment marked as completed' })
        }
        else {
            return res.json({ success: false, message: 'Mark Failed' })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

//api to mark appointment cancel
const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointments cancelled successfully' })
        }
        else {
            return res.json({ success: false, message: 'Cancellation Failed' })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

//api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId
        const appointments = await appointmentModel.find({ docId })

        console.log("Appointments for doctor:", appointments);

        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        console.log("Doctor ID:", docId);
        console.log("Appointments:", appointments);

        let patients = []
        appointments.forEach((item) => {
            if (!patients.includes(item.userId.toString())) {
                patients.push(item.userId.toString())
            }
        })
        const dashData = {
            earnings, appointments: appointments.length,
            patients: patients.length,
            latestAppointments: [...appointments].reverse().slice(0, 5)
            // latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({ success: true, dashData })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get docotr profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to update doctor profile data
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const { fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: 'Profile Updated' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard
    , updateDoctorProfile, doctorProfile
}