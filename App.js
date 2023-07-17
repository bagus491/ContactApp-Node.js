const express = require('express')
const app = express()
const port = 3000
const UsersRouter = require('./src/router/UserRouter')

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//ini kegunaannya untuk menggabungkan atau setting src/router yang bisa di pakai
const path = require('path')
app.set(path.join(__dirname, 'src/router'))

// middleware
app.use(UsersRouter)

app.use('/', (req,res) => {
    res.status(404)
    res.send('404 NOT FOUND')
})

app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})