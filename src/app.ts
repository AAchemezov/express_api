import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { json } from 'body-parser'

import { TYPES } from './types'
import { ILogger } from './logger/logger.interface'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { IUserController } from './users/user.controller.interface'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { AuthMiddleware } from './common/auth.middleware'

@injectable()
export class App {
	app: Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express()
		this.port = 8000
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	useMiddleWare(): void {
		this.app.use(json())
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))
		this.app.use(authMiddleware.execute.bind(authMiddleware))
	}

	useExceptionFilters(): void {
		this.app.use('/users', this.userController.router)
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init(): Promise<void> {
		const { port } = this

		this.useMiddleWare()
		this.useRoutes()
		this.useExceptionFilters()
		await this.prismaService.connect()
		this.server = this.app.listen(port)
		this.logger.log(`Сервер запущен на http://localhost:${port}`)
	}

	public close(): void {
		this.server.close()
	}
}
