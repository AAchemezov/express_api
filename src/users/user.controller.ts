import {inject, injectable} from "inversify";
import 'reflect-metadata'

import {BaseController} from "../common/base.controller";
import {IControllerRoute} from "../common/route.interface";
import {HTTPError} from "../errors/http-error.class";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
import {IUserController} from "./user.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {

    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes(
            {path: '/login', method: 'post', func: this.login},
            {path: '/register', method: 'post', func: this.register}
        )
    }

    login: IControllerRoute['func'] = (req, res, next) => {
        next(new HTTPError(401, 'ошибка авторизации', 'login'))
        // this.ok(res, 'login')
    }

    register: IControllerRoute['func'] = (req, res, next) => {
        this.ok(res, 'register')
    }

}