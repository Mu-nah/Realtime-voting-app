const express = require('express') 
const router = express()
const cookieParser = require('cookie-parser')
const User = require('../model/user')
const  {signup, signin} = require('../controllers/auth.controllers.js') 
const  {verifyToken} = require('../middlewares/auth.js') 


router.use(cookieParser())

router.get('/register',  (req, res) =>{
  res.render('register')
})

router.post('/register', signup,  (req, res) => {
})

router.get('/login',  (req, res) =>{
  res.render('login')
})

router.post('/login', signin,  (req, res) => {
})

module.exports = router