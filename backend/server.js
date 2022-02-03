require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const Router = require('./routes')
const cors = require('cors')
const dbConnect = require('./database')
const cookieParser = require('cookie-parser')
dbConnect()

app.use(express.json({limit: '8mb'}))
app.use(cookieParser())
app.use(cors({origin: [process.env.FRONTEDN_URL],credentials: true}))
app.use('/',Router)
app.use('/storage',express.static('storage')) 

app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.listen(PORT,()=> {
    console.log('listening on port 5000')
})