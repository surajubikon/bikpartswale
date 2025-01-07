import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import genertedRefreshToken from '../utils/generatedRefreshToken.js'
import uploadImageClodinary from '../utils/uploadImageClodinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Please provide email, name, and password",
                error: true,
                success: false
            });
        }

        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return response.status(400).json({
                message: "Email is already registered",
                error: true,
                success: false
            });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // Create new user payload
        const payload = {
            name,
            email,
            password: hashPassword
        };

        // Create a new user instance
        const newUser = new UserModel(payload);
        const savedUser = await newUser.save();

        // Generate OTP for email verification
        const otp = generatedOtp();  // Use a utility function to generate OTP
        console.log(`Generated OTP for ${name} (email: ${email}): ${otp}`);

        // Save OTP to the user with expiry
        savedUser.otp = otp;
        savedUser.expiry = new Date(Date.now() + 60 * 60 * 1000);  // OTP valid for 1 hour
        await savedUser.save();

        // Send verification email
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

        await sendEmail({
            sendTo: email,
            subject: "Verify your email - BikePartsWala",
            html: verifyEmailTemplate({
                name,
        url: verifyEmailUrl,
        otp: otp // Ensure OTP is passed here
            })
        });

        return response.json({
            message: "User registered successfully. Please check your email to verify.",
            error: false,
            success: true,
            data: savedUser
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || 'Internal server error',
            error: true,
            success: false
        });
    }
}
export async function verifyEmailController(request,response){
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }
}

//login controller
export async function loginController(request,response){
    try {
        const { email , password } = request.body


        if(!email || !password){
            return response.status(400).json({
                message : "provide email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email , verify_email : true})


        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//logout controller
export async function logoutController(request,response){
    try {
        const userid = request.userId //middleware

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//upload user avatar
export async  function uploadAvatar(request,response){
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)
        
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update user details
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//forgot password not login
export async function forgotPasswordController(request,response) {
    try {
        const { email } = request.body 

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password fromBikeparts",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message : "check your email",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(request,response){
    try {
        const { email , otp }  = request.body

        if(!email || !otp){
            return response.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toISOString()

        if(user.forgot_password_expiry < currentTime  ){
            return response.status(400).json({
                message : "Otp is expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }

        //if otp is not expired
        //otp === user.forgot_password_otp

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })
        
        return response.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//reset the password
export async function resetpassword(request,response){
    try {
        const { email , newPassword, confirmPassword } = request.body 

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "provide required fields email, newPassword, confirmPassword"
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "newPassword and confirmPassword must be same.",
                error : true,
                success : false,
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return response.json({
            message : "Password updated successfully.",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


//refresh token controler
export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//get login user details
export async function userDetails(request,response){
    try {
        const userId  = request.userId


        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something is wrong",
            error : true,
            success : false
        })
    }
}

// // API to verify OTP
// export const verifyOtp = (req, res) => {
//     const otpStore={}
//     const { email, otp } = req.body;
  
//     // Check if OTP exists in the store
//     const otpData = otpStore[email];
  
//     if (!otpData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No OTP request found for this email.'
//       });
//     }
  
//     // Check if OTP is expired
//     if (Date.now() > otpData.expiresAt) {
//       delete otpStore[email]; // Remove expired OTP
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new OTP.'
//       });
//     }
  
//     // Check if the OTP matches
//     if (otpData.otp === parseInt(otp)) {
//       delete otpStore[email]; // OTP is valid, so delete it from store
//       return res.json({
//         success: true,
//         message: 'OTP verified successfully!'
//       });
//     }
  
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid OTP. Please try again.'
//     });
//   };

export async function verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
  
      // Validate input
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required',
        });
      }
  
      // Find user by email and select OTP fields
      const user = await UserModel.findOne({ email }).select('otp otpExpiresAt verify_email');
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Check if OTP matches
      if (user.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP. Please try again.',
        });
      }
  
      // Check if OTP has expired
      if (Date.now() > user.otpExpiresAt) {
        return res.status(400).json({
          success: false,
          message: 'OTP has expired. Please request a new OTP.',
        });
      }
  
      // Update `verify_email` and clear OTP-related fields
      await UserModel.findByIdAndUpdate(user._id, {
        verify_email: true,
        otp: null,
        otpExpiresAt: null,
      });
  
      // Respond to client
      return res.json({
        success: true,
        message: 'OTP verified successfully! Email has been verified.',
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while verifying OTP. Please try again later.',
      });
    }
  }
  

  export async function resendOtp(req, res) {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        // Generate a new OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        const otpExpiresAt = Date.now() + 5 * 60 * 1000; // Set expiry to 5 minutes from now

        // Update user with new OTP and expiry time
        user.otp = newOtp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        // Send OTP via email
        const subject = 'Your OTP Code';
        const message = `Your OTP code is ${newOtp}. It is valid for 5 minutes.`;

        await sendEmail({
            sendTo: email,
            subject: "New OTP  - BikePartsWala",
            html: verifyEmailTemplate({
                name: user.name, // Pass user's name here
                url: `${process.env.CLIENT_URL}/verify-email`, // Include a verification URL if needed
                otp: newOtp, // Pass the new OTP
            }),
        });
        res.json({
            success: true,
            message: 'New OTP sent successfully!',
        });
    } catch (error) {
        console.error('Resend OTP Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while resending OTP. Please try again later.',
        });
    }
}
