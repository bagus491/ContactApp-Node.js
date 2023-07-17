



//homeContacts
 const HomeContacts = (req,res) => {
    try{
        res.render('Home',{
            title: 'halaman/home',
            layout: 'main-layouts/main-layouts',
           })
    }catch{
        res.status(400)
    }
   
}




module.exports = {HomeContacts}