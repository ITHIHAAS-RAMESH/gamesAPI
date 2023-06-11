const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const gamesData = require('../models/games')
router.get(['/all','/'],async (req,res)=>{
    const games = await gamesData.find({})
    try{
        res.json(games)
    }catch(err){
        console.log(err)
    }
})

router.get('/completed' ,async(req,res)=>{
    const finished = await gamesData.find({completed:true})
    try{
        res.json(finished)
    }catch(err){
        console.log(err)
    }
})

router.get('/playing',async(req,res)=>{
    const playing = await gamesData.find({completed:false})
    try{
        res.json(playing)
    }catch(err){
        console.log(err)
    }
})

router.get('/:name',async(req,res)=>{
    const game = await gamesData.findOne({name:req.params.name})
    try{
        res.json(game)
    }catch(err){
        console.log(err)
    }
})
router.post('/',async (req,res)=>{
    const newGame = req.body
    const gamePost = await gamesData.create(newGame)
    try{
        res.send(gamePost)
    }catch(err){
        console.log(err)
    }
})

router.patch('/:name',async(req,res)=>{
    const game = await gamesData.findOneAndUpdate({name:req.params.name},req.body)
    
    console.log(game)
    
    res.json({msg:`patch for ${req.params.name}`})
})

router.delete('/:name',async (req,res)=>{
    const deleted = await gamesData.findOneAndDelete({name:req.params.name})
    try{
        res.json({msg:'deleted'})
    }catch(err){
        console.log(err)
    }

})
module.exports = router





