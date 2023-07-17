const express = require('express')
const app = express()
const port = 3000
const UsersRouter = require('./src/router/UserRouter')

//midelware
const path = require('path')
app.set(path.join(__dirname, 'src/router'))

app.use(UsersRouter)

app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})