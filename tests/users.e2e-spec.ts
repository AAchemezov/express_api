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
			.send({ email: 'spec@email.com', password: '_' })

		expect(statusCode).toBe(422)
	})

	it('Login - success', async () => {
		const { body } = await request(application.app)
			.post('/users/login')
			.send({ email: 'user@example.info', password: 'password' })

		expect(body.jwt).not.toBeUndefined()
	})

	it('Login - error', async () => {
		const { statusCode } = await request(application.app)
			.post('/users/login')
			.send({ email: 'user@example.info', password: '_' })

		expect(statusCode).toBe(401)
	})

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'user@example.info', password: 'password' })

		const { statusCode, body } = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`)

		expect(statusCode).toBe(200)
		expect(body.email).toBe('user@example.info')
	})

	it('Info - error', async () => {
		const { statusCode } = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`)
		expect(statusCode).toBe(401)
	})
})

afterAll(() => {
	application?.close()
})
