const express = require('express')
const app = express()
const {HomeContacts} = require('../controllers/UserControllers')


//middleware


app.get('/',HomeContacts)







module.exports = app