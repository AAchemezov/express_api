import express from 'express'

import {userRouter} from './users/users.js'

const PORT = 8000
const app = express()

app.get('/hello', (req, res) => {
    res.send('Привет!')
})

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})