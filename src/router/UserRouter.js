const express = require('express')
const app = express()
const {HomeContacts,TambahKontak,Details} = require('../controllers/UserControllers')
const {addcontact,loadContacts,validContacts} = require('../utils/index')

//validator
const {body,validationResult} = require('express-validator')

const path = require('path')
app.set('views',path.join(__dirname, '../views'))

// settings views
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)

//middleware
const multer = require('multer')
const Upload = multer({dest: 'uploads/'})


app.get('/',HomeContacts)
app.get('/tambahkontak',TambahKontak)
app.get('/detail/:Nama',Details)

//app post
app.post('/tambahkontak',[
    body('Nama').custom((Value) =>{
        const duplikat = validContacts(Value)
        if(duplikat){
            throw new Error('nama sudah tersedia')
        }else{
            return true
        }
    }),
    body('Email').isEmail().withMessage('Email tidak valid'),
    body('noHp').isMobilePhone('id-ID').withMessage('noHp tidak valid')
],(req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.render('addcontact', {
            title: 'halaman/tambahkontak',
            layout: 'main-layouts/main-layouts',
            error: error.array()
        })
    }else{
        addcontact(req.body)
        res.redirect('/')
    }
 
})





module.exports = app