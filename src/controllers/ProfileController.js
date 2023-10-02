const {addProfile} = require('../utils/index')


const uploadProfile = (req,res) => {
    try{
        const imageUrl = req.file.path
        const imagetype = req.file.mimetype
        const {Nama} = req.body

        if(!imageUrl)
        {
            req.flash('msg','you didnt upload Foto')
            return res.redirect('/')
        }

        const ValidImage = ['jpg','jpeg','png'];
        //get last index
        const typeImage = imagetype.split('/')
        const getLast = typeImage[typeImage.length - 1]
        
        const CheckLast = ValidImage.find((e) => e === getLast.toLowerCase())

        if(!CheckLast)
        {
            req.flash('msg','your upload Not Foto')
            return res.redirect('/')
        }
        
        
        addProfile({Nama:`${Nama}`,Avatar:`${imageUrl}`})
        res.redirect(`/detail/${Nama}`)
    
    }catch(error){
        res.status(500).send({msg : 'internal Server Error'})
    }
}



module.exports = {uploadProfile}