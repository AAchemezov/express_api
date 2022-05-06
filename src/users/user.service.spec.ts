import 'reflect-metadata'
import { Container } from 'inversify'
import { UserModel } from '@prisma/client'

import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { IUserRepository } from './user.repository.interface'
import { IUserService } from './user.service.interface'
import { UserService } from './user.service'
import { User } from './user.entity'

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
}

const userRepositoryMock: IUserRepository = {
	find: jest.fn(),
	create: jest.fn(),
}

const container = new Container()
let configService: IConfigService
let userRepository: IUserRepository
let userService: IUserService

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService)
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock)
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(userRepositoryMock)

	userService = container.get<IUserService>(TYPES.UserService)
	configService = container.get<IConfigService>(TYPES.ConfigService)
	userRepository = container.get<IUserRepository>(TYPES.UserRepository)
})

describe('User service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValue('1')
		userRepository.create = jest
			.fn()
			.mockImplementationOnce(
				({ name, password, email }: User): UserModel => ({ name, password, email, id: 1 }),
			)
		const createdUser = await userService.createUser({
			name: 'spector',
			email: 'spec@email.com',
			password: '1',
		})

		expect(createdUser?.id).toEqual(1)
		expect(createdUser?.id).not.toEqual('1')
	})
})
