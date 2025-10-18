const User=require("../model/auth/User");
const bycrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const mongooseSession = require('connect-mongodb-session')(require('express-session'));
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
exports.signup=async(req,res)=>{

    const {name,email,password,role}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists! please login"});
        }
        const  hashpassword=await bycrypt.hash(password,10); // TODO: Hash password before saving
        const newUser=new User({name,email,password:hashpassword,role});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
        console.log(error);
    }
}

exports.login=async(req,res)=>{

    const {email,password}=req.body;
     try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"please signup first"});
        }

        const isPasswordCorrect=await bycrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
      res.cookie('userRole', existingUser.role, { maxAge: 3600000, httpOnly: true });
      res.cookie('userEmail', existingUser.email, { maxAge: 3600000 });
     
  

  req.session.existingUser = {
      id: existingUser._id,
      fullname: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      isAuthenticated: true
    };
 const JWT_SECRET=process.env.JWT_SECRET;
    const token = jwt.sign(
        { id: existingUser._id, fullname: existingUser.fullname, email: existingUser.email, role: existingUser.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
         
    // ✅ Redirect based on role 
    if (existingUser.role === 'admin') {
      // return res.redirect('/api/admin');
      return res.status(200).json({message:"Admin", token: token});

    } else if (existingUser.role === 'farmer') {
      // return res.redirect('/api/farmer');
      return res.status(200).json({message:"Farmer", token:token});

    }
    else {
        // return res.redirect('/api/customer');
        return res.status(200).json({message:"customer"});
    }
}
    catch(error){
        res.status(500).json({message:"Server error"});
        console.log(error);
    }
}