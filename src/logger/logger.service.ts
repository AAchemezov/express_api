import {Logger} from 'tslog'

export class LoggerService {
    public logger: Logger

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFunctionName: false,
            displayFilePath: 'hidden',
        })
    }

    log(...arg: unknown[]) {
        this.logger.info(...arg)
    }

    error(...arg: unknown[]) {
        this.logger.error(...arg)
    }

    warn(...arg: unknown[]) {
        this.logger.warn(...arg)
    }
}