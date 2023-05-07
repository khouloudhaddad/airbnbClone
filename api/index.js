const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('./models/User')
const jwt = require('jsonwebtoken');
const CookieParser = require('cookie-parser')
const app = express()

const connectDB = require('./config/db');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(CookieParser())
app.use(express.json());

/***DB Connection */
connectDB();

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    //res.json({name, email, password})
    try {
        const createdUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })

        res.status(201).json(createdUser)
    } catch (e) {
        res.status(422).json(e)
    }
});

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    //console.log(req.body)

    const user = await User.findOne({ email })
    if (user) {
        //check password
        const passwordOk = bcrypt.compareSync(password, user.password);
        if (passwordOk) {

            jwt.sign({
                email: user.email,
                name: user.name,
                id: user._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(404).json('Incorrect Password')
        }
    } else {
        res.json('not found');
    }

});

//User profile
app.get('/profile', (req, res)=>{

    const {token} = req.cookies;

    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user)=>{
            if(err) throw err;

            res.json(user)
        })
    }else{
        res.json(null)
    }

})

app.listen(4000);