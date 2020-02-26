const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const path=require('path')
require('dotenv').config()
const mongoose = require('mongoose');

const cors=require('cors')
const app = express();
const port = process.env.PORT || 5000;
const SECRET = 'shhh';


mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://localhost/hvl`, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});
const User=require('./models/User')

app.use(cors())
//app.use(express.json()) // for parsing application/json
app.use(cookieParser()) //cookie-parser dùng để đọc cookies của request:
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/auth/login', (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;

    if(!email || !pass){
        res.status(200).send({status:'Sai Email hoặc Mật khẩu. Thử lại!'})
		next()
    }
    User.findOne({email:req.body.email},(e,usr)=>{
        if(e){console.log(e)}
        if(usr){
            let token = jwt.sign({email: usr.email}, SECRET);
            res.cookie('token', token, {
                maxAge:50000,
                httpOnly: true,
                // secure: true;
            })
            res.status(200).send({status:'Đăng nhập thành công'})
        }else{
            res.status(200).send({status:'Sai Email hoặc Mật khẩu. Thử lại!'})
        }
    }) 
})
app.post('/auth/signup', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const repass = req.body.repass;
    let reEmail=/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
    let rePass=/\w{6,}/
    if(!email || !pass || !repass){
        res.status(200).send({status:'Email hoặc Mật khẩu không hợp lệ.'})
    }else if(!reEmail.test(email)){
            res.status(200).send({status:'Email không hợp lệ.'})
    }else if(pass!=repass){
            res.status(200).send({status:'Nhập lại mật khẩu không trùng khớp.'})
    }else if(!rePass.test(pass)){
            res.status(200).send({status:'Mật khẩu phải lớn hơn 6 ký tự bao gồm chữ và số, không chứ các ký tự đặc biệt.'})
    }else{
        User.findOne({email:req.body.email},(e,usr)=>{
            if(e){console.log(e)}
            if(usr){
                res.status(200).send({status:'Email đã được Đăng ký'})
            }
            if(!usr){
                User.create({email:req.body.email,pass:req.body.pass},(e,newuser)=>{
                    res.status(200).send({status:'Đăng ký thành công.'})
                })
            }
        })
    }
    
    
    
       
})


app.use('/api/users', (req, res) => {
    const token = req.cookies.access_token;

    console.log('token \n', token);
    try{
        let a=Object.create(null)
        decoded = jwt.verify(token, SECRET);
        res.status(200).json(decoded);
        console.log(decoded)
    }catch(err){
        res.status(400)
        throw err;
    }
    
})
app.use("/build", express.static('./build/'));
app.use(express.static(path.join(__dirname, 'build')));
app.use((err, req, res, next)=> {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(port, () => {
    console.info(`listening on port ${port}`);
})
User.find({},(e,r)=>console.log(r))
