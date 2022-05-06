import { App } from '../src/app'
import { boot } from '../src/main'
import request from 'supertest'

let application: App

beforeAll(async () => {
	const { app } = await boot
	application = app
})

describe('Users e2e', () => {
	it('Register - error', async () => {
		const { statusCode } = await request(application.app)
			.post('/users/register')
			.send({ email: 'spec@email.com', password: '1' })
		expect(statusCode).toBe(422)
	})
})

afterAll(() => {
	application?.close()
})
