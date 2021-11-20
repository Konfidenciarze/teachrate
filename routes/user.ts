import express, {Request, Response}  from "express";
const Users = express.Router();

Users.get('/:id', (req: Request, res: Response)=>{
    res.render('user')
})

export { Users }