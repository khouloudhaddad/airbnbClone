const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('./models/User')
const app = express()

const connectDB = require('./config/db');


const bcryptSalt = bcrypt.genSaltSync(10);


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

/***DB Connection */
connectDB();

app.post('/register', async (req, res)=>{
    const {name, email, password}  = req.body;
    //res.json({name, email, password})
    try{
        const createdUser = await User.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, bcryptSalt)
        })
    
        res.status(201).json(createdUser)
    }catch(e){
        res.status(422).json(e)
    }
});

app.post("/login", async (req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(user){
            //check password
            const paswordOk = bcrypt.compareSync(password, user.password);
            if(passwordOk){
                res.status(200).json(user)
            }else{
                res.status(404).json('Incorrect Password')
            }
        }
    }catch(e){
        res.status(422).json(e)
    }
})

app.listen(4000);