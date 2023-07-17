const fs = require('fs')


const filepath = './data-api'
if(!fs.existsSync(filepath)){
    fs.mkdirSync(filepath)
}


const datapath = './data-api/Contacts.json'
if(!fs.existsSync(datapath)){
    fs.writeFileSync(datapath, '[]','utf-8')
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

module.exports = {addcontact,loadContacts,validContacts}