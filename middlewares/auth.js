const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    const token = req.body.token;
    if(!token){
        return res.send({message:"userID is required!"})
    }
    jwt.verify(token,process.env.SECRET_TOKEN,(err,data)=>{
        if(err){
            return res.send({message:"userID is invalid!"})
        }
        

        req.body = {...req.body, userID : data.user._id};
        
    })
    
   next();
}

module.exports = auth;