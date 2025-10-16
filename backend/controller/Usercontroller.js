const User=require("../model/auth/User");

exports.signup=async(req,res)=>{

    const {name,email,password,role}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser=new User({name,email,password,role});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

exports.login=async(req,res)=>{

    const {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"please signup first"});
        }
        if(existingUser.password!==password){
            return res.status(400).json({message:"Invalid credentials"});
        }
      res.cookie('userRole', existingUser.role, { maxAge: 3600000, httpOnly: true });
      res.cookie('userEmail', existingUser.email, { maxAge: 3600000 });
     
    const store = new mongooseSession({
    uri: process.env.MONGODB_URI,
    collection: 'mysessions',
    // give a name to seesion

});

app.use(session({
  secret: 'F2C', // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  store: store, // Use MongoDB session store
  cookie: {
    secure: false, // set true only in production with HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

  req.session.existingUser = {
      id: existingUser._id,
      fullname: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      isAuthenticated: true
    };
    req.session.IsAuthenticated = true; // Set authentication status

    // const token = jwt.sign(
    //     { id: user._id, fullname: user.fullname, email: user.email, role: user.role },
    //     JWT_SECRET,
    //     { expiresIn: '1h' }
    //   );
    //   res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
         
    // ✅ Redirect based on role 
    if (existingUser.role === 'admin') {
      // return res.redirect('/api/admin');
      return res.status(400).json({message:"Admin"});

    } else if (existingUser.role === 'farmer') {
      // return res.redirect('/api/farmer');
      return res.status(400).json({message:"Farmer"});

    }
    else {
        // return res.redirect('/api/customer');
        return res.status(400).json({message:"customer"});


    }
}
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}