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
    const createdUser = await User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, bcryptSalt)
    })

    res.json(createdUser)
});

app.listen(4000);