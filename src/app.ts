import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IUserController } from './users/user.controller.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use('/users', this.userController.router);
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		const { port } = this;

		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(port);
		this.logger.log(`Сервер запущен на http://localhost:${port}`);
	}
}
