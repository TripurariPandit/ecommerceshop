import { userSchema } from "./user.schema.js";
import mongoose from "mongoose";

const userModel = mongoose.model('Users', userSchema);
export default class UserRepository {
    signUp = async (name, email, password) => {
        try {
            const user = await userModel.findOne({ email });
            if (user) {
                return "User already exist";
            }
            const newUser = new userModel({ name, email, password });
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err);
        }
    }

    findByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    findUserById = async (userId) => {
        try {
            const user = await userModel.findById(userId);
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    reSetPassword = async (user, newPassword) => {
        try {
            user.password = newPassword;
            await user.save();
        } catch (err) {
            console.log(err);
        }
    }

    forgetPassword = async (user, resetToken) => {
        try {
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save();
        } catch (err) {
            console.log(err);
        }
    }

    reSetPasswordWithToken = async (newPassword, token) => {
        try {
            const user = await userModel.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });
            if (!user) {
                return false;
            }
            user.password = newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return user;
        } catch (err) {
            console.log(err);
        }
    }
    findUserByToken = async (token)=>{
        try{
            const user = await userModel.findOne({resetPasswordToken: token});
            return user;
        } catch(err){
            console.log(err);
        }
    }
}