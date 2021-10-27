import express, {Request, Response}  from "express";
const Auth = express.Router();

Auth.get('/', (req: Request, res: Response)=>{
    res.render('index');
})

Auth.get('/login', (req: Request, res: Response)=>{
    res.render('login');
})

Auth.post('/login', (req: Request, res: Response)=>{
    res.redirect('/');
})

Auth.post('/register', (req: Request, res: Response)=>{
    res.redirect('/');
})

export { Auth }