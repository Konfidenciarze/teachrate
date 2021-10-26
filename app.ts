if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

import express from "express";
import { Auth } from './routes/auth';
import { User } from './routes/user';

const mongoose = require('mongoose');

const app = express();
const port = 3000;

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/teachrater';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", ()=>{
    console.log("Database connected");
})

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use('', Auth);
app.use('/user', User)

app.listen(port, ()=>{
    console.log(`app runs on port ${port}`);
})