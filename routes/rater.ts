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
        let keys = Object.keys(req.body)
        let ratings = [0, 0, 0]
        for(let i = 0; i < 3; i++){
            let keyVal = keys[i].split('-')
            ratings[i] = parseInt(keyVal[1])
        }
        const alreadyVoted = await Rating.findOne({teacher: req.params.teacherId, rater: req.params.userId})
        if(!alreadyVoted){
            const teacher = await Teacher.findOne({_id: req.params.teacherId})
            const user = await User.findOne({_id: req.params.userId})
            let tier = 1
            if(user.prime === teacher.faculty){
                tier = 10
            }else if(user.secondary === teacher.faculty){
                tier = 5
            }else if(user.secondary === '' || user.prime === ''){
                tier = 1
            }else{
                tier = 3
            }
            const newVote = new Rating({material: ratings[0], punctual: ratings[1], passing: ratings[2], comment: req.body.comment, rater: user, teacher, tier})
            newVote.save()
        }
        res.redirect('/rate/browse')
    }catch(e){
        console.log(e)
        res.redirect('/rate/browse')
    }
})

Rate.get('/profile/:id', async(req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const overallStats = {
            material: 0,
            punctual: 0,
            passing: 0
        }
        const teacher = await Teacher.findOne({ _id: id });
        const votes = await Rating.find({ teacher: id })
            .populate('rater')
            .sort({ tier: -1 })

        for(let i = 0; i < votes.length; i++){
            let t = votes[i].tier
            overallStats.material += votes[i].material * t
            overallStats.punctual += votes[i].punctual * t
            overallStats.passing += votes[i].passing * t
        }

        overallStats.material /= 10 / votes.length
        overallStats.punctual /= 10 / votes.length
        overallStats.passing /= 10 / votes.length

        res.render('teacherProfile', {teacher, votes, overallStats});
    }catch(e){
        console.log(e)
        res.redirect('/rate/browse')
    }
})

Rate.get('/profile/:id/rate', isLoggedIn, async(req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const teacher = await Teacher.findOne({ _id: id });
        res.render('teacherProfileRate', {teacher});
    }catch(e){
        console.log(e)
        res.redirect('/rate/browse')
    }
})

Rate.post('/profile/:id', (req: Request, res: Response)=>{
    res.redirect('/rate/browse')
})

export { Rate }