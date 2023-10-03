import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: 'dpgeeks2connect@gmail.com',  //Admin Gmail ID
        pass: 'axcrbctuwofzwutf'  //Admin Gmail Password
    }
})