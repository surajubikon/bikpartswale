import jwt from 'jsonwebtoken'

const auth = async(request,response,next)=>{
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1]
       
       

        if(!token){
            return response.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }
        if (decode.exp < Date.now() / 1000) {
            return res.status(401).json({
              message: "Token expired",
              error: true,
              success: false
            });
          }
          
        
        // Attach userId to the request for further processing
        request.userId = decode.id;
        request.user = { _id: decode.id };
       next();
    } catch (error) {
        console.error(error.message);  // Log the error for debugging
        return response.status(500).json({
            message: "You have not logged in",
            error: true,
            success: false
        });
    }
};

export default auth