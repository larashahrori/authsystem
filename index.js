const express=require('express');
const app = express();
const ejs=require('ejs');
const auth=require('./router/auth');
const mongoose = require('mongoose');
const path = require('path');

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb+srv://lara:12345@cluster0.vrwsu.mongodb.net/users?retryWrites=true&w=majority',
    {useNewUrlParser:true},()=>{
    console.log("connected to db");
})

app.use('/',auth)

app.listen(3200,()=>{
    console.log('listening on 3200')
})