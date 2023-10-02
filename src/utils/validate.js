//validator
const {body} = require('express-validator')

//model
const {validContacts} = require('./index')

const validateData = [
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
]


module.exports = {validateData}