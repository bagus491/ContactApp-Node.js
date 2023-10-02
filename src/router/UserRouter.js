const express = require('express')
const app = express()
const {HomeView,AddView,DetailView} = require('../controllers/UserControllers')

//contactController
const {addKontak,deleteKontak,updateKontak} = require('../controllers/ContactController')

//profile
const {uploadProfile} = require('../controllers/ProfileController')


//validate
const {validateData} = require('../utils/validate')



const path = require('path')
app.set('views',path.join(__dirname, '../views'))

// settings views
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)

//middleware
const multer = require('multer')
const Upload = multer({dest: 'uploads/'})

//midleware
app.use('/uploads',express.static('uploads'))

//midleware
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//middleware
app.use(express.static(path.join(__dirname, '../public')))



// tambahkontak
app.get('/contact',AddView)
//app post tambahkontak
app.post('/contact',validateData,addKontak)
//delete
app.delete('/contact', deleteKontak)
//update
app.put('/contact',validateData,updateKontak)

//viewHome
app.get('/',HomeView)
//viewDetail
app.get('/detail/:Nama',DetailView)


//app post upload
app.post('/upload', Upload.single('Avatar'),uploadProfile)





module.exports = app