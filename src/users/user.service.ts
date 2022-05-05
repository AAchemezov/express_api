import { IUserService } from './user.service.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { IUserRepository } from './user.repository.interface'
import { UserModel } from '@prisma/client'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name)
		const salt = this.configService.get('SALT')
		await newUser.setPassword(password, +salt)
		const candidate = await this.userRepository.find(email)
		if (candidate) {
			return null
		}
		return this.userRepository.create(newUser)
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const candidate = await this.userRepository.find(email)
		if (!candidate) {
			return false
		}
		const newUser = new User(candidate.email, candidate.name, candidate.password)
		return newUser.comparePassword(password)
	}
}
