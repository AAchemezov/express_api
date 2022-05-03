import { injectable } from 'inversify';
import { Logger } from 'tslog';
import 'reflect-metadata';

import { ILogger } from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFunctionName: false,
			displayFilePath: 'hidden',
		});
	}

	log(...arg: unknown[]): void {
		this.logger.info(...arg);
	}

	error(...arg: unknown[]): void {
		this.logger.error(...arg);
	}

	warn(...arg: unknown[]): void {
		this.logger.warn(...arg);
	}
}
