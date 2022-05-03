import { inject, injectable } from 'inversify'
import 'reflect-metadata'

import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IUserController } from './user.controller.interface'
import { NextFunction, Request, Response } from 'express'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes(
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		)
	}

	login(req: Request<unknown, unknown, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body)
		next(new HTTPError(401, 'ошибка авторизации', 'login'))
		// this.ok(res, 'login')
	}

	register(
		req: Request<unknown, unknown, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body)
		this.ok(res, 'register')
	}
}
