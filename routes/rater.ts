import express, {Request, Response}  from "express";
const Rate = express.Router();
const Teacher = require('../models/teacher')

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

Rate.get('/profile/:id', async(req: Request, res: Response)=>{
    const { id } = req.params
    const teacher = await Teacher.findOne({_id: id});
    res.render('teacherProfile', {teacher});
})

Rate.post('/profile/:id', (req: Request, res: Response)=>{
    res.redirect('/rate/browse')
})

export { Rate }