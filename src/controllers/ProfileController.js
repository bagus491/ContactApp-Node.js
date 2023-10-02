const uploadProfile = (req,res) => {
    try{
        const imageUrl = req.file.path
        const {Nama} = req.body
        
        addProfile({Nama:`${Nama}`,Avatar:`${imageUrl}`})
        res.redirect(`/detail/${Nama}`)
    
    }catch(error){
        res.status(500).send({msg : 'internal Server Error'})
    }
}



module.exports = {uploadProfile}