import { Request, Response, NextFunction } from "express"
const Teacher = require('../models/teacher')

async function browserFormValidator(req: Request, res: Response, next: NextFunction){
    const { name, faculty, mode} = req.body
    const faculties = await Teacher.distinct('faculty')
    if(mode === 'data' && !name){
        req.flash('error', 'Brak wymaganych danych')
        return res.redirect('/rate')
    }

    if(mode === 'faculty'){
        if(!faculty){
            req.flash('error', 'Brak wymaganych danych')
            return res.redirect('/rate')
        }else{
            if(!faculties.includes(faculty)){
                req.flash('error', 'Błędna jednostka')
                return res.redirect('/rate')
            }
        }
    }
    return next()
}

function loginFormValidator(req: Request, res: Response, next: NextFunction){
    const { username, password } = req.body
    if(!username || !password){
        req.flash('error', 'Brak wymaganych danych')
        return res.redirect('/login');
    }
    const loginregex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(username.includes(' ')){
        req.flash('error', 'Błędny login lub hasło')
        return res.redirect('/login');
    }else if(!loginregex.test(username)){
        req.flash('error', 'Błędny login lub hasło')
        return res.redirect('/login');
    }
    return next();
}

async function registerFormValidator(req: Request, res: Response, next: NextFunction){
    const faculties = await Teacher.distinct('faculty')
    const { username, password, password2, prime, secondary } = req.body;
    const loginregex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!username || !password || !password2 || !prime || !secondary){
        return res.redirect('/register')
    }
    
    if(username.includes(' ')){
        req.flash('error', 'Błędny login lub hasło')
        return res.redirect('/register');
    }else if(!loginregex.test(username)){
        req.flash('error', 'Błędny login lub hasło')
        return res.redirect('/register');
    }

    if(password.includes(' ')){
        req.flash('error', 'Błędny login lub hasło')
        return res.redirect('/register')
    }
    if(password !== password2){
        req.flash('error', 'Wprowadzone hasła się różnią')
        return res.redirect('/register')
    }

    if(prime !== ''){
        if(!faculties.includes(prime)){
            req.flash('error', 'Błąd wprowadzonej jednostki')
            return res.redirect('/register')
        }
    }

    if(secondary !== ''){
        if(!faculties.includes(secondary)){
            req.flash('error', 'Błąd wprowadzonej jednostki')
            return res.redirect('/register')
        }
    }
    return next();
}

export { browserFormValidator, loginFormValidator, registerFormValidator }