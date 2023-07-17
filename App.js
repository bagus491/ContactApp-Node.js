import Express from 'express'
const app = Express()
const port = 3000


app.get('/', (req,res) => {
    res.send('hello world')
})




app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})