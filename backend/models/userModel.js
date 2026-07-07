import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    address: {
        line1: { type: String, default: '' },
        line2: { type: String, default: '' }
    },
    gender: { type: String, default: 'Not selected' },
    dob: { type: String, default: 'Not selected' },
    phone: { type: String, default: '00000000000' }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;