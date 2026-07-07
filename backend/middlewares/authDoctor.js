import jwt from'jsonwebtoken'
//doctor authentication middleware
const authDoctor = async(req,res,next)=>{
    try{
        const dtoken = req.headers['dtoken']
        if(!dtoken){
            return res.json({success:false,message:'Not Authorized user Login Again'})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
        console.log("Decoded token:", token_decode); // debug
        req.docId = token_decode.id  

        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}


export default authDoctor