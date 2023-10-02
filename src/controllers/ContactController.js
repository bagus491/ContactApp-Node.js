const {addcontact,DeleteContact,UpdateContact} = require('../utils/index')

//validate
const {validationResult} = require('express-validator')

const addKontak = (req,res) => {
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
           return  res.render('addcontact', {
                title: 'halaman/tambahkontak',
                layout: 'main-layouts/main-layouts',
                error: error.array()
            })
        }

        addcontact(req.body)
        req.flash('msg','success add Contact')
        res.redirect('/')
    }catch(error){
        res.status(500).send({msg : 'internal Server Error'})
    }
}


const deleteKontak = (req,res) => {
    try{
        DeleteContact(req.body.Nama)
        req.flash('msg','success delete Contact')
        res.redirect('/')
    }catch{
       res.status(500).send({msg : 'Internal Server Error'})
    }
}

const updateKontak = (req,res) => {
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.send({error: error.array()})
        }
        
            UpdateContact(req.body)
            req.flash('msg','success update Contact')
            res.redirect('/')
        
    }catch(error){
        res.status(500).send({msg : 'Internal Server Error'})
    }
}

module.exports = {addKontak,deleteKontak,updateKontak}