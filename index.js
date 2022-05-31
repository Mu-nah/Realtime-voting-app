const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()
const dataFile = path.join(__dirname, "data.json")
const userRoutes = require('./routes/user')
const User = require('./model/user')
const  {signup, signin} = require('./controllers/auth.controllers.js') 
const  {verifyToken} = require('./middlewares/auth.js') 



app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
//app.use(express.static(path.join(__dirname, 'views')))

const dbURI='';
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( app.listen(3000, ()=>{
  console.log('connected to db and running')}))
.catch((err) => console.log(err));




app.get('/', (req, res) => {
  res.render('first')
})



app.get('/result', verifyToken, async  (req, res) => {
  let  data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
  const totalVotes = Object.values(data).reduce((total, n) => total += n, 0)
  const resc = Object.values(data )
  data = Object.entries(data).map(([label, votes]) => {
    return {
      label,
      percentage: (((100*votes)/totalVotes) || 0).toFixed(0)
    }
  })
  
// res.json(resc[2]) 
 res.render('land', {resc, totalVotes, role: req.user.role })
})
 

app.get('/vote', verifyToken, (req, res) => {
 // res.sendFile(path.join(__dirname+'/views/index.html'))
 res.render('index')
})


app.get('/poll', async (req, res) => {
  let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
  const totalVotes = Object.values(data).reduce((total, n) => total += n, 0)
  data = Object.entries(data).map(([label, votes]) => {
    return {
      label,
      percentage: (((100*votes)/totalVotes) || 0).toFixed(0)
    }
  })
  res.json(data) 
})

app.post('/poll', async (req, res) => {
const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
data[req.body.add]++
await fs.writeFile(dataFile, JSON.stringify(data))
  res.end()
})


app.use('/user', userRoutes)
