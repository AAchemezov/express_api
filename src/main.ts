import { Container, ContainerModule, interfaces } from 'inversify'

import { LoggerService } from './logger/logger.service'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { ExceptionFilter } from './errors/exception.filter'
import { UserController } from './users/user.controller'
import { App } from './app'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { IUserController } from './users/user.controller.interface'

export interface IBootstrapReturn {
	app: App
	appContainer: Container
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUserController>(TYPES.IUserController).to(UserController)
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
