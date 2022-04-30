const db= require('../model');
const bcrypt=require('bcrypt');

const signup =async(req, res) => {
        const{password,username,email,confirm,firstname,lastname} = req.body;
        const foundedemail =await db.find({email: email});
        const foundedeusername=await db.find({username: username});
        if(!foundedemail.length&&!foundedeusername.length){
            if(password===confirm){
                const hash = await bcrypt.hash(password,10);
                const newUser=new db({
                    username:  username,
                    name: { firsname:firstname,
                    lastname:lastname},
                    password: hash,
                    email: email,
                });
                const s=await newUser.save();
                res.status(201).redirect('/login');
            }
            else{
                res.send("password not equal confirm")
            }
        }
        else{
            res.send("this email or username is exist")
        }
}

const login = async(req, res)=>{
    const {email,password} = req.body;
    const foundeduser =await db.find({email: email});
    if(foundeduser.length){

        if(await bcrypt.compare(password, foundeduser[0].password)){
            req.session.ISlogin=true;

            req.session.u_id=foundeduser[0]._id.valueOf();
            req.session.save();
            console.log(req.session)
            res.redirect('/home')
        }
        else{
            res.send("password or email is not correct")
        }
    }
    else{
        res.send("password or email is not correct")
    }
}

const logout=(req, res)=>{
    req.session.destroy();
    res.redirect('/home')
}
const islogin=(req, res,next)=>{

    if(req.session.ISlogin===true){
        next();
    }
    else{
        res.send("not login <a href='/login'>go login</a>")
    }
}
module.exports={
    signup,login,islogin,logout
}