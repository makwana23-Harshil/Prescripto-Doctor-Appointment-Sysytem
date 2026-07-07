import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoutes.js'

//app config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//middle wares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json());


//API end point
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/router


app.get('/',(req,res)=>{
    res.send('API working ')
})

//start the express app
app.listen(port,()=>console.log("Server Started",port))