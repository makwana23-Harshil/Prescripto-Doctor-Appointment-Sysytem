import mangoose from 'mongoose';

const connectDB = async()=>{
    mangoose.connection.on('connected',()=>console.log('Database connected'))
    await mangoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}

export default connectDB;