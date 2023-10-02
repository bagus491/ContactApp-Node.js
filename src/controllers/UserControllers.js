const {loadContacts,validContacts,getProfile} = require('../utils/index')



//homeContacts
 const HomeView = (req,res) => {
    const contact = loadContacts()
    try{
        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
            contact,
            msg: req.flash('msg')
           })
    }catch(error){
        res.status(404).send('404 not found')
    }
}

//tambahkontakViews
const AddView = (req,res) => {
    try{
        res.render('addcontact', {
            title: 'halaman/addcontact',
            layout: 'main-layouts/main-layouts',
        })
    }catch(error){
        res.status(404).send('404 not Found')
    }
}

//details
const DetailView = async (req,res) => {
    try{
        const contact = await validContacts(req.params.Nama)
        const profile = await getProfile(req.params.Nama)

        if(!contact){
            return res.status(404).send('404 not Found')
        }

        res.render('details',{
            title: 'halaman/details',
            layout: 'main-layouts/main-layouts',
            contact,
            profile
        })

    }catch(error){
        res.status(404).send('404 not Found')
    }
}





module.exports = {HomeView,AddView,DetailView}