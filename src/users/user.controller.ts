import { inject, injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import 'reflect-metadata'

import { TYPES } from '../types'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { IUserController } from './user.controller.interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { IUserService } from './user.service.interface'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IConfigService } from '../config/config.service.interface'
import { AuthGuard } from '../common/auth.guard'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService)
		this.bindRoutes(
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		)
	}

	async login(
		req: Request<unknown, unknown, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body)
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'))
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'))
		this.ok(res, { jwt })
	}

	async register(
		{ body }: Request<unknown, unknown, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body)
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'))
		}
		this.ok(res, { email: result.email, id: result.id })
	}

	async info({ user }: Request<unknown, unknown, UserRegisterDto>, res: Response): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user ?? '')
		this.ok(res, { id: userInfo?.id, email: userInfo?.email })
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(error, token) => {
					if (error) {
						reject(error)
					}
					resolve(token as string)
				},
			)
		})
	}
}
