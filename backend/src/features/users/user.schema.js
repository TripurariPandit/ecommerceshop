import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [25, "Name can't be greater than 25 characters"],
        minLength: [5, "Name can't be less than 5 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});