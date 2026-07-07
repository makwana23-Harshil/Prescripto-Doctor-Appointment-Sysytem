import jwt from'jsonwebtoken'
//user authentication middleware
const authUser = async(req,res,next)=>{
    try{
        const {token} =req.headers
        if(!token){
            return res.json({success:false,message:'Not Authorized user Login Again'})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded token:", token_decode); // debug
        req.userId = token_decode.id

        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }


}


export default authUser