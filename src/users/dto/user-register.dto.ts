import { IsEmail, IsString, Length } from 'class-validator'

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string
	@IsString({ message: 'Не указан пароль' })
	@Length(6, undefined, { message: 'Слишком короткий пароль' })
	password: string
	@IsString({ message: 'Не указано имя' })
	@Length(2, undefined, { message: 'Слишком короткое имя' })
	name: string
}
