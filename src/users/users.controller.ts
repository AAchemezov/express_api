import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {IControllerRoute} from "../common/route.interface";

export class UsersController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes(
            {path: '/login', method: 'post', func: this.login},
            {path: '/register', method: 'post', func: this.register}
        )
    }

    login: IControllerRoute['func'] = (req, res, next) => {
        this.ok(res, 'login')
    }

    register: IControllerRoute['func'] = (req, res, next) => {
        this.ok(res, 'register')
    }

}