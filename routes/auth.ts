import express, {Request, Response}  from "express";
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

Auth.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req: Request, res: Response)=>{
    res.redirect('/')
})

Auth.post('/register', async(req: Request, res: Response)=>{
    try{
        const { username, password, prime, secondary } = req.body;
        const user = new User({username, prime, secondary});
        const regUser = await User.register(user, password);
        req.login(regUser, err=>{
            if(err){
                console.log(err)
                res.redirect('/register')
            }else{
                res.redirect('/user/'+regUser._id);
            }
        });
    } catch(e){
        console.log(e);
        res.redirect('/register')
    }
})

Auth.get('/logout', (req: Request, res: Response)=>{
    req.logOut();
    res.redirect('/');
})

export default Auth 
