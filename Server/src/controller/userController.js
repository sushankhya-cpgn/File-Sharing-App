const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
exports.userController = async(req,res)=>{
   
    try{
        const user = req.user;
        const email = user.email;
        const user_info = await prisma.user.findUnique({where:{email}});
        res.status(200).json({message:{id:user_info.id,email:user_info.email}})
    }
    
    catch(err){
        res.status(404).json({error:err})
    }


}