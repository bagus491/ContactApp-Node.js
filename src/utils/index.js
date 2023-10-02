const fs = require('fs')


const filepath = './data-api'
if(!fs.existsSync(filepath)){
    fs.mkdirSync(filepath)
}


const datapath = './data-api/Contacts.json'
if(!fs.existsSync(datapath)){
    fs.writeFileSync(datapath, '[]','utf-8')
}

const Profilepath = './data-api/Profile.json'
if(!fs.existsSync(Profilepath)){
    fs.writeFileSync(Profilepath,'[]','utf-8')
}

const loadContacts = () => {
    const Contacts = fs.readFileSync('./data-api/Contacts.json')
    const contact = JSON.parse(Contacts)
    return contact
}


const saveContacts = (values) => {
    fs.writeFileSync('./data-api/Contacts.json', JSON.stringify(values))
}


const addcontact = (value) => {
    const contacts = loadContacts()
    contacts.push(value)
    saveContacts(contacts)
}


//getcontacts
const validContacts = (Nama) => {
    const contacts = loadContacts()
    const contact = contacts.find((e) => e.Nama == Nama)
    return contact
}


//profile
const loadProfile = () => {
    const Profiles = fs.readFileSync('./data-api/Profile.json','utf-8')
    const Profile = JSON.parse(Profiles)
    return Profile
}

const saveProfile = (Profiles) => {
    fs.writeFileSync('./data-api/Profile.json', JSON.stringify(Profiles))
}

const addProfile = (Profile) => {
    const Profiles = loadProfile()
    Profiles.push(Profile)
    saveProfile(Profiles)
}

const getProfile = (Nama) => {
    const Profiles = loadProfile()
    const profile = Profiles.find((e) => e.Nama === Nama)
    return profile
}


//delete contancts dan profile
const DeleteContact = (Nama) => {
    const contacts = loadContacts()
    const Profiles = loadProfile()

    const contact = contacts.filter((e) => e.Nama !== Nama)
    const profile = Profiles.filter((e) => e.Nama !== Nama)

    
    saveContacts(contact)
    saveProfile(profile)
}

//update
const UpdateContact = (value) => {
    const contacts = loadContacts()
    const Profiles = loadProfile()

    const contact = contacts.filter((e) => e.Nama !== value.oldNama)
    const profile = Profiles.find((e) => e.Nama == value.oldNama)

    delete value.oldNama
    contact.push(value)
    saveContacts(contact)

    //validate
    const getProfile = Profiles.find((e) => e.Nama == value.oldNama)
    if(getProfile)
    {
        profile["Nama"] = value.Nama
        
        const newProfile = Profiles.filter((e) => e.Nama !== profile.Nama)
        newProfile.push(profile)
        saveProfile(newProfile)
    }

 }

module.exports = {addcontact,loadContacts,validContacts,addProfile,getProfile,DeleteContact,UpdateContact}