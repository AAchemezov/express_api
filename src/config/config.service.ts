import { IConfigService } from './config.service.interface'
import { config, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput

	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		const result = config()
		if (result.error || !result.parsed) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env')
		} else {
			this.logger.log('[ConfigService] Конфигурация загружена')
			this.config = result.parsed
		}
	}

	get(key: string): string {
		return this.config[key]
	}
}
