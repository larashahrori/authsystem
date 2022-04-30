const express=require('express');
const router=express.Router();
const ejs=require('ejs');
const session=require('express-session');
const authcontroler=require('../controler/authcontroler');
var MongoDBStore = require('connect-mongodb-session')(session);
const db= require('../model');
var app = express();

var store = new MongoDBStore({
    uri: 'mongodb+srv://web2:12345@cluster0.pdc3w.mongodb.net',
    collection: 'mySessions'
});

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    store:store,
    saveUninitialized: true,
    
}))

router.post('/signup',authcontroler.signup)

router.post('/login',authcontroler.login)

router.get('/home',authcontroler.islogin,async(req, res) =>{
    const foundeduser=await db.findById(req.session.u_id);
    res.render("index",{user:foundeduser})
})
router.get('/login',(req, res) =>{
    res.render('login')
})
router.get('/signup',(req, res) =>{
    res.render('signup')
})
router.post('/home',authcontroler.logout)
module.exports =router;

