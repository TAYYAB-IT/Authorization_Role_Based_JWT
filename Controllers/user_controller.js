const bcrypt = require('Bcrypt')
const User=require('../Schemas/user_schema')
const Auth=require('./Auth');

//SignUP
module.exports.signup=async (req, res)=>{
    const user=new User();
    user.Name=req.body.Name;
    user.Username=req.body.Username;
    user.Role=req.body.Role;
    const hash_password=async(password,encryption_cylce)=>{
        const encrypted=await bcrypt.hash(password,encryption_cylce).then((data)=>{
            
            return data
        })
        return encrypted
    }
     user.Password=await hash_password(req.body.Password,5);

     user.save().then(data=>{res.send("You are Registered")}).
     catch(error=>{res.send(error)})
}

//Signin

module.exports.signin=async(req,res)=>{
 const data=await User.findOne({Username:req.body.Username});
if(!data){
    res.send("Invalid Username")
}
else{
  const pass_chk=await bcrypt.compare(req.body.Password,data.Password).then(result=>{
        if(result){
            return true;
        }
        else{
            return false;
        }

    })

    if(!pass_chk){
        res.send("Invalid Paassword!")
    }
    else{
        res.send(await Auth.genrate_token(data));
    }
}
}


// Normal User Greeter
module.exports.greeter=(req,res)=>{
    res.send("Welcome To User Panal..");
}