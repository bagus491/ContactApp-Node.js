
require('../utils/index')


//homeContacts
 const HomeContacts = (req,res) => {
    try{
        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
           })
    }catch{
        res.status(404).send('404 not found')
    }
}

//tambahkontakViews
const TambahKontak = (req,res) => {
    try{
        res.render('addcontact', {
            title: 'halaman/addcontact',
            layout: 'main-layouts/main-layouts',
        })
    }catch{
        res.status(404).send('404 not Found')
    }
}



module.exports = {HomeContacts,TambahKontak}