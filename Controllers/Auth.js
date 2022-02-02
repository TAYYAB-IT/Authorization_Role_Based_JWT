const jwt = require('jsonwebtoken')
const secret_key=process.env.secret_key;
module.exports.token_verify=async(req, res, next)=>{
    const bearer_token=  req.headers['authorization'] //Extract from request headers
    if(bearer_token){
    const token=bearer_token.split(" ")[1]
    req.token=token
     await jwt.verify(req.token,secret_key,(err)=>{ //Varify the token
         if(!err){
          let data=jwt.decode(req.token)
          req.user=data.data;
        next();
         }
        else{
        res.send(err)
        }
     })
}
else{
 res.send("Signin Again.")
}
}


//
module.exports.genrate_token=async(data)=>{
   return await jwt.sign({data},secret_key,{expiresIn:'50000s'});
}

//Check Role
module.exports.checkrole=(roles=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.Role)){
           next();
        }
        else{
            res.send("Not Authorized!")
        }

    }
})
