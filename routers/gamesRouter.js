const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const gamesData = require('../models/games')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
router.post(['/all'],auth,async (req,res)=>{
    
    const author = req.body.userID
    const games = await gamesData.find({author:author})
    if(!games){
        return res.send({message:"no games found!"})
    }
    try{
        return res.json(games)
    }catch(err){
        console.log(err)
    }
})

router.post('/completed',auth ,async(req,res)=>{
    const author = req.body.userID
    const finished = await gamesData.find({author:author,completed:true})
    try{
        res.json(finished)
    }catch(err){
        console.log(err)
    }
})

router.post('/playing',auth,async(req,res)=>{
    const author = req.body.userID
    const playing = await gamesData.find({author:author,completed:false})
    try{
        res.json(playing)
    }catch(err){
        console.log(err)
    }
})

router.post('/:name',auth,async(req,res)=>{
    const author = req.body.userID
    const game = await gamesData.findOne({name:req.params.name})
    try{
        res.json(game)
    }catch(err){
        console.log(err)
    }
})
router.post('/',auth,async (req,res)=>{
    const author = req.body.userID
    const newGame = {...req.body, author:author}
    console.log(newGame)
    const gamePost = await gamesData.create(newGame)
    try{
        
        res.send(gamePost)
    }catch(err){
        console.log(err)
    }
})

router.patch('/:name',auth,async(req,res)=>{
    const author = req.body.userID
    const game = await gamesData.findOneAndUpdate({name:req.params.name,author:author},req.body)
    
    console.log(game)
    
    res.json({msg:`patch for ${req.params.name}`})
})

router.delete('/:name',auth,async (req,res)=>{
    const deleted = await gamesData.findOneAndDelete({name:req.params.name,author:req.body.userID})
    try{
        res.json({msg:'deleted'})
    }catch(err){
        console.log(err)
    }

})
module.exports = router





