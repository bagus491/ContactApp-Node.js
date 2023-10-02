const {loadContacts,validContacts,getProfile,search} = require('../utils/index')



//homeContacts
 const HomeView = (req,res) => {
    let contact = loadContacts()
        
    const pages = req.query.page
    //pagination
    const Jmlhperhalaman = 4;
    const panjangContact = contact.length;
    let jmlhhalaman = Math.ceil(panjangContact / Jmlhperhalaman);
    let  awalData = pages ?  pages : 1
    
        //pembagian
        let defaultPage = (awalData - 1) * Jmlhperhalaman
        let lastpage = defaultPage + Jmlhperhalaman
        contact = contact.slice(defaultPage,lastpage)
    
     try{
        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
            contact,
            msg: req.flash('msg'),
            jmlhhalaman
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

//search
const searchKontak = (req,res) => {
    try{
        const keyword = req.query.search_query
        const contact = search(keyword)
        
        if(keyword === '')
        {
            res.redirect('/')
        }

        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
            contact,
            msg: req.flash('msg'),
           
           })
    }catch(error){
        res.status(500).send({msg : 'Internal Server Error'})
    }
}





module.exports = {HomeView,AddView,DetailView,searchKontak}