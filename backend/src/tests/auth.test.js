const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const User = require('../models/User')

// connect to a test database before all tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

// clean up users collection after each test
afterEach(async () => {
    await User.deleteMany()
})

// disconnect after all tests
afterAll(async () => {
    await mongoose.connection.close()
})

// ----------------------
// REGISTER TESTS
// ----------------------

describe('POST /api/auth/register', () => {

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Suparsh',
                email: 'suparsh@test.com',
                password: 'password123'
            })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('token')
        expect(res.body.user.email).toBe('suparsh@test.com')
    })

    it('should not register user with duplicate email', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Suparsh',
                email: 'suparsh@test.com',
                password: 'password123'
            })

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Suparsh',
                email: 'suparsh@test.com',
                password: 'password123'
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('User already exists')
    })

    it('should not register user with missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'suparsh@test.com'
            })

        expect(res.statusCode).toBe(400)
    })

})

// ----------------------
// LOGIN TESTS
// ----------------------

describe('POST /api/auth/login', () => {

    it('should login successfully with correct credentials', async () => {
        // first register a user
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Suparsh',
                email: 'suparsh@test.com',
                password: 'password123'
            })

        // then login
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'suparsh@test.com',
                password: 'password123'
            })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('token')
    })

    it('should not login with wrong password', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Suparsh',
                email: 'suparsh@test.com',
                password: 'password123'
            })

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'suparsh@test.com',
                password: 'wrongpassword'
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Invalid credentials')
    })

    it('should not login with unregistered email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nobody@test.com',
                password: 'password123'
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Invalid credentials')
    })

})