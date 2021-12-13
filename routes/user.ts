import express, {Request, Response}  from "express";
import { isLoggedIn } from "../middleware/permitions";
const Users = express.Router();

const User = require('../models/user')
const Rating =require('../models/rating')


Users.get('/:id', isLoggedIn, async(req: Request, res: Response)=>{
    try{
        const user = await User.findOne({_id: req.params.id})
        const votes = await Rating.find({rater: req.params.id})
        res.render('user', { user, votes })
    }catch(e){
        console.log(e)
    }
})

export { Users }