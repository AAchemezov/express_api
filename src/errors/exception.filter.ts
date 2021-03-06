import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'

import { IExceptionFilter } from './exception.filter.interface'
import { HTTPError } from './http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.Logger) private logger: ILogger) {}

	catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] Ошибка ${error.statusCode}: ${error.message}`)
			res.status(error.statusCode).send({ error: error.message })
		} else {
			this.logger.error(`${error.message}`)
			res.status(500).send({ error: error.message })
		}
	}
}
