import express from 'express'

const PORT = 8000
const app = express()

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})

app.get('/hello', (req, res)=>{
    res.send('Привет!')
})