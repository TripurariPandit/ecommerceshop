import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signUp = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const isValidPassword = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
            if (!isValidPassword) {
                return res.status(400).send({ error: "Password should be between 8-16 characters and have a special character" });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = await this.userRepository.signUp(name, email, hashPassword);
            return res.status(201).send(user);
        } catch (err) {
            console.log(err);
        }
    }

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("User Not Found");
            }
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return res.status(400).send("Incorrect Credentials");
            }
            const token = jwt.sign({
                userId: user._id,
                email: user.email,
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                });
            return res.status(200).send({ token, name: user.name.split(" ")[0] });
        } catch (err) {
            console.log(err);
        }
    }

    reSetPassword = async (req, res) => {
        try {
            const { newPassword } = req.body;
            const userId = req.userId;
            const isValidPassword = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(newPassword);
            if (!isValidPassword) {
                return res.status(400).send({ error: "Password should be between 8-16 characters and have a special character" });
            }
            const user = await this.userRepository.findUserById(userId);
            if (!user) {
                return res.status(400).send("User Not Found");
            }
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(400).send("New Password should be different");
            }
            const newHashPassword = await bcrypt.hash(newPassword, 12);
            await this.userRepository.reSetPassword(user, newHashPassword);
            return res.status(200).send("Password is updated");
        } catch (err) {
            console.log(err);
        }
    }

    forgetPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const resetToken = crypto.randomBytes(32).toString('hex');
            await this.userRepository.forgetPassword(user, resetToken);

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tripurarikumar766@gmail.com',
                    pass: 'qllu iaap edoz vrzm'
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'tripurarikumar766@gmail.com',
                subject: 'Password Reset Request',
                text: `You are receiving this because you have requested to reset your password. 
                       Please click on the following link, or paste it into your browser to complete the process:
                       http://localhost:4000/api/users/reset-password
                       Your token is ${resetToken}`
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err){
                    console.log(err);
                    return res.status(500).send('Error sending email');
                }
                res.status(200).send('Password reset link sent');
            });
        } catch (err) { 
            console.log(err);
        }
    }

    reSetPasswordWithToken = async (req, res)=>{
        try{
            const { newPassword, token } = req.body;
            const isValidPassword = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(newPassword);
            if (!isValidPassword) {
                return res.status(400).send({ error: "Password should be between 8-16 characters and have a special character" });
            }
            const user = await this.userRepository.findUserByToken(token);
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(400).send("New Password should be different");
            }
            const hashPassword = await bcrypt.hash(newPassword, 12);
            const userWithNewPassword = await this.userRepository.reSetPasswordWithToken(hashPassword, token);
            if (!userWithNewPassword) {
                return res.status(400).send('Token is invalid or has expired');
            }
            res.status(200).send('Password has been reset');
        } catch(err){
            console.log(err);
        }
    }
}