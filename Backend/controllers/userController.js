import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



// login user function
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        // agar user h toh
        if (!user) {
            return res.json({success:false, message:"User does't exist"})
        }
        // mathch krna h 
        const isMatch = await bcrypt.compare(password,user.password);
        // anhi h toh 
        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }
        // agar password match krta h toh 
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,res) => {
    const {name,password,email} = req.body;
    try {
        // checking if user already exixt
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }
        // validate email formate and tring pass
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"plase enter valid email"})
        }
        // password length
        if (password.length<8) {
            return res.json({success:false, message:"plase enter a storng password"})
        }
        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        // new user created
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        // save the user
        const user =  await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"ERROR"})
    }
}




export {loginUser, registerUser}