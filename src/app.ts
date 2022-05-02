import express, {Express} from "express"
import {Server} from 'http'
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";

export class App {
    app: Express
    server: Server
    port: number
    private logger: LoggerService;
    private userController: UsersController;


    constructor(
        logger: LoggerService,
        userController: UsersController
    ) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.userController = userController
    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    public async init() {
        const {port} = this

        this.useRoutes()
        this.server = this.app.listen(port)
        this.logger.log(`Сервер запущен на http://localhost:${port}`)
    }
}