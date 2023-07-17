const express = require('express')
const app = express()
const {HomeContacts} = require('../controllers/UserControllers')


app.get('/',HomeContacts)







module.exports = app