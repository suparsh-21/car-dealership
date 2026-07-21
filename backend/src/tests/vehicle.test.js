const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const User = require('../models/User')
const Vehicle = require('../models/Vehicle')

let adminToken
let userToken

// connect to database before all tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

// create fresh admin and user before each test
beforeEach(async () => {
    await User.deleteMany()
    await Vehicle.deleteMany()

    // register an admin user
    const adminRes = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123'
        })
    adminToken = adminRes.body.token

    // manually set admin role in db
    await User.findOneAndUpdate({email: 'admin@test.com'}, {role: 'admin'})

    // login again to get token with admin role
    const adminLoginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'admin@test.com',
            password: 'password123'
        })
    adminToken = adminLoginRes.body.token

    // register a normal user
    const userRes = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Normal User',
            email: 'user@test.com',
            password: 'password123'
        })
    userToken = userRes.body.token
})

afterAll(async () => {
    await mongoose.connection.close()
})

// ----------------------
// ADD VEHICLE TESTS
// ----------------------

describe('POST /api/vehicles', () => {

    it('should add a new vehicle when logged in', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                make: 'Toyota',
                model: 'Camry',
                category: 'sedan',
                price: 25000,
                quantity: 5,
                year: 2023
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.vehicle.make).toBe('Toyota')
    })

    it('should not add vehicle without token', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .send({
                make: 'Toyota',
                model: 'Camry',
                category: 'sedan',
                price: 25000,
                quantity: 5,
                year: 2023
            })

        expect(res.statusCode).toBe(401)
    })

    it('should not add vehicle with missing fields', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                make: 'Toyota'
            })

        expect(res.statusCode).toBe(400)
    })

})

// ----------------------
// GET ALL VEHICLES TESTS
// ----------------------

describe('GET /api/vehicles', () => {

    it('should get all vehicles when logged in', async () => {
        // add a vehicle first
        await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .get('/api/vehicles')
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.vehicles.length).toBe(1)
    })

    it('should not get vehicles without token', async () => {
        const res = await request(app)
            .get('/api/vehicles')

        expect(res.statusCode).toBe(401)
    })

})

// ----------------------
// SEARCH VEHICLES TESTS
// ----------------------

describe('GET /api/vehicles/search', () => {

    it('should search vehicles by make', async () => {
        await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .get('/api/vehicles/search?make=Toyota')
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.vehicles.length).toBe(1)
    })

    it('should search vehicles by price range', async () => {
        await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .get('/api/vehicles/search?minPrice=20000&maxPrice=30000')
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.vehicles.length).toBe(1)
    })

})

// ----------------------
// UPDATE VEHICLE TESTS
// ----------------------

describe('PUT /api/vehicles/:id', () => {

    it('should update a vehicle when logged in', async () => {
        const vehicle = await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .put(`/api/vehicles/${vehicle._id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({price: 27000})

        expect(res.statusCode).toBe(200)
        expect(res.body.vehicle.price).toBe(27000)
    })

    it('should return 404 for non existing vehicle', async () => {
        const fakeId = new mongoose.Types.ObjectId()

        const res = await request(app)
            .put(`/api/vehicles/${fakeId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({price: 27000})

        expect(res.statusCode).toBe(404)
    })

})

// ----------------------
// DELETE VEHICLE TESTS
// ----------------------

describe('DELETE /api/vehicles/:id', () => {

    it('should delete a vehicle when admin', async () => {
        const vehicle = await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .delete(`/api/vehicles/${vehicle._id}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Vehicle deleted successfully')
    })

    it('should not delete vehicle when normal user', async () => {
        const vehicle = await Vehicle.create({
            make: 'Toyota',
            model: 'Camry',
            category: 'sedan',
            price: 25000,
            quantity: 5,
            year: 2023
        })

        const res = await request(app)
            .delete(`/api/vehicles/${vehicle._id}`)
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(403)
    })

})