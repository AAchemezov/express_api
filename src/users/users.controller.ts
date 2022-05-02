import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {IControllerRoute} from "../common/route.interface";
import {HTTPError} from "../errors/http-error.class";

export class UsersController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger);
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