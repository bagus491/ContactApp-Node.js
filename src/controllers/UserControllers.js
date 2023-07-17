const {loadContacts,validContacts,getProfile} = require('../utils/index')



//homeContacts
 const HomeContacts = (req,res) => {
    const contact = loadContacts()
    try{
        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
            contact
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

//details
const Details = async (req,res) => {
    const contact = await validContacts(req.params.Nama)
    const profile = await getProfile(req.params.Nama)
    if(contact){
        try{
            res.render('details',{
                title: 'halaman/details',
                layout: 'main-layouts/main-layouts',
                contact,
                profile
            })
        }catch{
            res.status(404).send('404 not Found')
        }
    }else{
        res.status(401).send('401 not Found')
    }
   
}





module.exports = {HomeContacts,TambahKontak,Details}