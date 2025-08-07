const jwt = require('jsonwebtoken');


const verifytoken = (req,res,next)=>{

    // Header sent as Bearer <token>
    const token = req.cookies.token; 

    if(!token){
        res.status(403).json("No token found");
    }
    try{
       const decoded = jwt.verify(token,process.env.SECRET_KEY);
       req.user = decoded;
       next();
    }

    catch(err){
        return res.status(401).json({message:"Invalid or Expired Token"});
    }

}

module.exports = verifytoken;