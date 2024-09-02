import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";


const userRouter = express.Router();

userRouter.use(express.json());



const verifyUser = async (req, res, next) => {
    try{
            
        const token = req.cookies.id;
        if(!token){
            return res.json({status: false, message: "No token provided."});
        }
        jwt.verify(token,process.env.KEY);
        next();
    }
    catch(err){
        return res.json({status:false, message:err.message})
    }
}

userRouter.get('/verify', verifyUser, async (req, res) => {
    try {
        const token = req.cookies.id;
        if (!token) {
            return res.status(401).json({ status: false, message: "No token provided." });
        }

        const decoded = jwt.verify(token, process.env.KEY);

        const user = await User.findById(decoded.id); // Corrected `User` and `findById` method
        if (!user) {
            return res.status(401).json({ status: false, message: "User not found." });
        }

        res.json({ status: true, message: "User authenticated successfully", user });
    } catch (error) {
        return res.status(401).json({ status: false, message: error.message }); // Corrected `err` to `error`
    }
});



userRouter.post('/signin', async (req,res)=>{
  
    console.log(req.body)
    const {email,password}= req.body;

    if(!email || !password){
        return res.status(400).json({message:'please enter all fields'})
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({
                    message:'Incorrect password'
                })
            }
              
            // Generating JWT token 
            const token =jwt.sign(
                    {id: user._id},
                    process.env.KEY,
                    {expiresIn : '7d'}
            );

            res.cookie('id',token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production', 
                // sameSite: 'Strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
            })
            return res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        console.error('Error during sign-in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


userRouter.get('/getUser',async function (req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  })
  

userRouter.put('/createUser',async function (req, res) {

})  




export default userRouter;