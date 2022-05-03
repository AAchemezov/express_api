export interface ILogger {
	log(...arg: unknown[]): void

	error(...arg: unknown[]): void

	warn(...arg: unknown[]): void
}
