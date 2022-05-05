import { Container, ContainerModule, interfaces } from 'inversify'

import { LoggerService } from './logger/logger.service'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { ExceptionFilter } from './errors/exception.filter'
import { UserController } from './users/user.controller'
import { App } from './app'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { IUserController } from './users/user.controller.interface'
import { IUserService } from './users/user.service.interface'
import { UserService } from './users/user.service'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { IUserRepository } from './users/user.repository.interface'
import { UserRepository } from './users/user.repository'

export interface IBootstrapReturn {
	app: App
	appContainer: Container
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUserController>(TYPES.UserController).to(UserController)
	bind<IUserService>(TYPES.UserService).to(UserService)
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope()
	bind<App>(TYPES.Application).to(App)
})

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	app.init()

	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
