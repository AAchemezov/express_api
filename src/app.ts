import express, {Express} from "express"
import {userRouter} from "./users/users"
import {Server} from 'http'
import {LoggerService} from "./logger/logger.service";

export class App {
    app: Express
    server: Server
    port: number
    private logger: LoggerService;


    constructor(logger: LoggerService) {
        this.app = express()
        this.port = 8000
        this.logger = logger
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }

    public async init() {
        const {port} = this

        this.useRoutes()
        this.server = this.app.listen(port)
        this.logger.log(`Сервер запущен на http://localhost:${port}`)
    }
}