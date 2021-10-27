import express, {Request, Response}  from "express";
const Rate = express.Router();

Rate.get('/', (req: Request, res: Response)=>{
    res.render('index');
})

Rate.get('/browse', (req: Request, res: Response)=>{
    res.render('browser');
})

Rate.get('/profile/:id', (req: Request, res: Response)=>{
    res.render('teacherProfile');
})

Rate.post('/profile/:id', (req: Request, res: Response)=>{
    res.redirect('/rate/browse')
})

export { Rate }