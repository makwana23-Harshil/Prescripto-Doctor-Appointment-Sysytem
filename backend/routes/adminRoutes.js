import express from 'express'
import multer from 'multer'
import { addDoctor, allDoctor, loginAdmin,appointmentsAdmin,appointmentCancel,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import {changeAvailablity} from '../controllers/doctorController.js'

const adminRouter = express.Router()


adminRouter.post(
    '/add-doctor',authAdmin,
    (req, res, next) => {
        upload.fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        success: false,
                        message: err.message,
                        code: err.code
                    })
                }

                return res.status(400).json({
                    success: false,
                    message: err.message || 'Invalid upload request'
                })
            }
            next()
        })
    },
    addDoctor
)

adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctor) //(navigate to this , middle ware to authnicate the admin , see all doctor)
adminRouter.post('/change-availability',authAdmin, changeAvailablity) //(navigate to this , middle ware to authnicate the admin , change  the avialbel or not the doctor )
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin, appointmentCancel)
adminRouter.get('/dashboard',authAdmin, adminDashboard)


export default adminRouter



