const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const mygames = require('./routers/gamesRouter')
const users = require('./routers/usersRouter')
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin: '*'}))
app.use('/mygames',mygames)
app.use('/users',users)
mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('connected to DB')
    app.listen(PORT, ()=>{
        console.log(`server is listening to ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
    



