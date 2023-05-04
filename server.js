console.clear()
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json())

app.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    if (!name || !email || !password) {
       return res.status(400).json({message:"Invalid Data"})
    }

   let user = await User.findOne({email:email});
   
   if (user) {
    return res.status(400).json({message: "User already exists"})
   }

   user = new User({name, email, password});
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
   user.password = hash;
   await user.save()
   res.status(201).json({message:"User Created Successfully", user})
    } catch (error) {
        next(error);
    }
})


app.post('/login', async (req, res, next)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        delete user._doc.password;
        res.status(200).json({message:"LOGIN SUCCESSFUL", user})

    } catch (error) {
        next(error);
    }
})

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({message:"Server Error Occured",})
})


connectDB('mongodb://127.0.0.1:27017/attendance-db').then(() => {
    console.log("Database Connected");
    app.listen(5050, () => {
        console.log("listening on port 5050");
    })
}).catch((err) => {
    console.log(err);
})

