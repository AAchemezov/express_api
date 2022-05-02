import express, {Express} from "express"
import {userRouter} from "./users/users"
import {Server} from 'http'

export class App {
    app: Express
    server: Server
    port: number

    constructor() {
        this.app = express()
        this.port = 8000
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }

    public async init() {
        const {port} = this

        this.useRoutes()
        this.server = this.app.listen(port)
        console.log(`Сервер запущен на http://localhost:${port}`)
    }
}