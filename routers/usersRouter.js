const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/',async (req,res)=>{
    const users = await usersModel.find({})
    if(!users){
        return res.send({message:"no users found!"})
    }
    res.send(users)
})

router.post('/signup', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    if(!username || !password){
        return res.send({message:"username and password are required!"})
    }
    const userExists = await usersModel.findOne({username : username});
    if(userExists){
        return res.send({message:"username already exists!"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await usersModel.create({
        username,
        password:hashedPassword
    })
    const token = jwt.sign({user},process.env.SECRET_TOKEN);
    res.send({token : token})
})

router.post('/login', async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.send({message:"username and password are required!"})
    }
    const user = await usersModel.findOne({username : username});
    if(!user){
        return res.send({message:"username or password is incorrect!"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.send({message:"username or password is incorrect!"})
    }
    const token = jwt.sign({user},process.env.SECRET_TOKEN);
    res.send({token : token})
})

module.exports = router;