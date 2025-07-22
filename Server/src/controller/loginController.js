const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();

exports.loginController = async(req,res) =>{
    try{

        const {email,password} = req.body;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            res.status(404).json({error:"User Not Found"});
        }
        const result = await bcrypt.compare(password,user.password_hash);
    
        if(result){
            const token =  jwt.sign({userId:user.id,email:user.email},process.env.SECRET_KEY,{expiresIn:'1d'});
            res.cookie("token",token);
            res.status(200).json({message:"Login successfull",token});
            
        }
        if(!result){
        res.status(401).json({error:"Invalid Password"});
        }
    }

    catch(err){
        console.log("Error",err);
        res.status(500).json({error:"Error Logging in"});
    }

}

exports.signup = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            res.status(400).json({error:!email?"Enter email":"Enter Password"})
        }
        console.log(email,password)
        const hash_password = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                email:email,
                password_hash:hash_password
            }
        })
      
        res.status(201).json({message:"User Created",user:{id:user.id,email:user.email}});
    }

    catch(err){
        res.status(500).json("Signup Failed",err);
    }

}

