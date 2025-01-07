const verifyEmailTemplate = ({ name, url, otp, newOtp = null }) => {
    return `
        <p>Dear ${name},</p>    
        <p>Thank you for registering with BikePartsWala.</p>   
        <p>Your OTP is: <strong>${otp}</strong></p>
        ${
            newOtp
                ? `<p>Your new OTP is: <strong>${newOtp}</strong></p>`
                : ''
        }
        <p>Alternatively, you can verify your email by clicking the button below:</p>
        <a href="${url}" style="color: white; background-color: orange; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 10px;">
            Verify Email
        </a>
        <p>This OTP is valid for 1 hour. Please do not share it with anyone.</p>
    `;
};

export default verifyEmailTemplate;
