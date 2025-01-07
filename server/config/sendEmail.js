import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Ensure EMAIL_USER and EMAIL_PASS are defined in the .env file
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is not defined in the .env file");
}

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password from .env
    },
    tls: {
        rejectUnauthorized: false, // Ignore certificate validation errors
    },
});

// Function to send email
const sendEmail = async ({ sendTo, subject, html }) => {
    console.log("Sending email to:", sendTo); // Log the recipient's email for debugging purposes

    try {
        // Send the email
        const info = await transporter.sendMail({
            from: `"BikePartsWale" <${process.env.EMAIL_USER}>`, // sender address
            to: sendTo, // receiver address
            subject: subject, // subject line
            html: html, // html body
        });

        // Log the message ID to confirm email sent
        console.log("Message sent: %s", info.messageId);
        return info; // Return the email information
    } catch (error) {
        // Log any errors encountered during the sending process
        console.error("Error sending email: ", error);
    }
};

export default sendEmail;
