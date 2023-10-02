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

//cors
const cors = require('cors')
app.use(cors(
    origin = 'http://localhost:3000/'
))

//morgan &cors
const morgan = require('morgan')
const helmet = require('helmet')

app.use(morgan('dev'))
app.use(helmet())


//cookie&session&flash
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

app.use(cookie('secret'))
app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000},
    secret: 'secret'
}))
app.use(flash())

// middleware
app.use(UsersRouter)

app.use('/', (req,res) => {
    res.status(404)
    res.send('404 NOT FOUND')
})

app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})