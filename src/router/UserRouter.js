const express = require('express')
const app = express()
const {HomeContacts} = require('../controllers/UserControllers')

const path = require('path')
app.set('views',path.join(__dirname, '../views'))

// settings views
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)


app.get('/',HomeContacts)







module.exports = app