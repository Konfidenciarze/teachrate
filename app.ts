import express from "express";
import { Auth } from './routes/auth';
import { User } from './routes/user';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use('', Auth);
app.use('/user', User)

app.listen(port, ()=>{
    console.log(`app runs on port ${port}`);
})