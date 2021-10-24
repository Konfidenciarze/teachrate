import express, {Request, Response}  from "express";
const User = express.Router();

User.get('/:id', (req: Request, res: Response)=>{
    res.render('user')
})

export { User }