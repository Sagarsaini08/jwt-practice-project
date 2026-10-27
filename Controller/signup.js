const User =require('../Model/signup.js');

async function handlesignup(req,res){
    const {name,email,password}=req.body;
   if(!name || !email || !password){
    return res.status(400).json({
        msg: "all information is neccessary"
    })
   }

   await User.create({
    name,
    email,
    password
   });
    res.redirect('/signin');
}



module.exports={handlesignup};