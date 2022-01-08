import express, {Request, Response}  from "express";
import { loginFormValidator, registerFormValidator } from "../middleware/formValidators";
const Auth = express();
const User = require('../models/user');
const passport = require('passport');
const Teacher = require('../models/teacher')

Auth.get('/', (req: Request, res: Response)=>{
    res.render('index');
})

Auth.get('/login', (req: Request, res: Response)=>{
    res.render('login');
})

Auth.get('/register', async(req, res)=>{
    const faculties = await Teacher.distinct('faculty')
	res.render("register", {faculties});
})

Auth.post('/login', loginFormValidator, passport.authenticate('local', {failureRedirect: '/login',failureFlash: 'Błędny login lub hasło'}), (req: Request, res: Response)=>{
    req.flash('success', 'Pomyślnie zalogowano')
    res.redirect('/')
})

Auth.post('/register', registerFormValidator, async(req: Request, res: Response)=>{
    try{
        const { username, password, prime, secondary } = req.body;
        const user = new User({username, prime, secondary});
        const regUser = await User.register(user, password);
        req.login(regUser, err=>{
            if(err){
                console.log(err)
                req.flash('error', 'Błąd logowania')
                res.redirect('/register')
            }else{
                res.redirect('/user/'+regUser._id);
            }
        });
    } catch(e){
        req.flash('error', 'Błąd logowania')
        res.redirect('/register')
    }
})

Auth.get('/logout', (req: Request, res: Response)=>{
    req.logOut();
    req.flash('success', 'Wylogowano')
    res.redirect('/');
})

export default Auth 
