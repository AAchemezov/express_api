import {LoggerService} from "../logger/logger.service";
import {Response, Router} from 'express'
import {IControllerRoute} from "./route.interface";

export abstract class BaseController {
    private readonly _router: Router

    constructor(private logger: LoggerService) {
        this._router = Router()
    }

    get router() {
        return this._router
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json')
        res.status(200).json(message)
    }

    public ok<T>(res: Response,  message: T) {
       return this.send<T>(res, 200, message)
    }

    public created(res: Response) {
        return res.sendStatus(201)
    }

    protected bindRoutes(...routes: IControllerRoute[]) {
        routes.forEach(({func, method, path}) => {
            this.logger.log(`[${method}] ${path}`)
            this.router[method](path, func.bind(this))
        })
    }
}