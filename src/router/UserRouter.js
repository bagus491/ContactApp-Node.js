const express = require('express')
const app = express()
const {HomeContacts,TambahKontak,Details} = require('../controllers/UserControllers')
const {addcontact,loadContacts,validContacts,addProfile,DeleteContact} = require('../utils/index')

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

//midleware
app.use('/uploads',express.static('uploads'))

//midleware
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


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

app.post('/upload', Upload.single('Avatar'), (req,res) => {
    const imageUrl = req.file.path
    const {Nama} = req.body
    
    try{
        // kenapa dikirim data object? karena ini file yang berbeda  dan Nama di ambil dengan method Destruction
        addProfile({Nama:`${Nama}`,Avatar:`${imageUrl}`})
        res.redirect(`/detail/${Nama}`)
    }catch{
        res.redirect('/')
    }
   
})

//delete
app.delete('/detail', (req,res) => {
    try{
        DeleteContact(req.body)
        res.redirect('/')
    }catch{
        res.status(404).send('404 NOT FOUND')
    }
})



module.exports = app