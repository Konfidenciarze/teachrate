import express, {Request, Response}  from "express";
import { isLoggedIn } from "../middleware/permitions";
const Rate = express.Router();

const Teacher = require('../models/teacher')
const Rating = require('../models/rating')
const User = require('../models/user')

Rate.get('/', (req: Request, res: Response)=>{
    res.render('browser', {teachers: []});
})

Rate.get('/browse', (req: Request, res: Response)=>{
    res.redirect('/rate');
})

Rate.post('/browse', async (req: Request, res: Response)=>{
    const {name} = req.body;
    const teachers = await Teacher.find({data: {"$regex": name, '$options' : 'i'}})
    res.render('browser', {teachers});
})

Rate.post('/:teacherId/by/:userId', isLoggedIn, async(req: Request, res: Response)=>{
    try{
        const { material, punctual, passing, comment } = req.body
        const alreadyVoted = await Rating.findOne({teacher: req.params.teacherId, rater: req.params.userId})
        if(!alreadyVoted){
            const teacher = await Teacher.findOne({_id: req.params.teacherId})
            const user = await User.findOne({_id: req.params.userId})
            const newVote = new Rating({material, punctual, passing, comment, rater: user, teacher})
            newVote.save()
        }
        res.redirect('/rate/browse')
    }catch(e){
        console.log(e)
        res.redirect('/rate/browse')
    }
})

Rate.get('/profile/:id', async(req: Request, res: Response)=>{
    const { id } = req.params
    const teacher = await Teacher.findOne({_id: id});
    res.render('teacherProfile', {teacher});
})

Rate.post('/profile/:id', (req: Request, res: Response)=>{
    res.redirect('/rate/browse')
})

export { Rate }