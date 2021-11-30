if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

import express from "express"

import  Auth  from './routes/auth'
import { Users } from './routes/user'
import { Rate } from "./routes/rater"

const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')
const app = express()

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/teachrater'

const User = require('./models/user')

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, 'connection error:'))
db.once("open", ()=>{
    console.log("Database connected")
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const secret = process.env.SECRET || 'thisisagoodsecretforfuckssake';

const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

// passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('', Auth)
app.use('/user', Users)
app.use('/rate', Rate)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app runs on port ${port}`)
})