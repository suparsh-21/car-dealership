const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const User = require('../models/User')
const Vehicle = require('../models/Vehicle')

let adminToken
let userToken
let vehicleId

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

beforeEach(async () => {
    await User.deleteMany()
    await Vehicle.deleteMany()

    // register and login admin
    await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123'
        })

    await User.findOneAndUpdate({email: 'admin@test.com'}, {role: 'admin'})

    const adminLoginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'admin@test.com',
            password: 'password123'
        })
    adminToken = adminLoginRes.body.token

    // register and login normal user
    const userRes = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Normal User',
            email: 'user@test.com',
            password: 'password123'
        })
    userToken = userRes.body.token

    // create a vehicle to use in tests
    const vehicle = await Vehicle.create({
        make: 'Toyota',
        model: 'Camry',
        category: 'sedan',
        price: 25000,
        quantity: 5,
        year: 2023
    })
    vehicleId = vehicle._id
})

afterAll(async () => {
    await mongoose.connection.close()
})

// ----------------------
// PURCHASE TESTS
// ----------------------

describe('POST /api/vehicles/:id/purchase', () => {

    it('should purchase a vehicle and decrease quantity', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Vehicle purchased successfully')
        expect(res.body.vehicle.quantity).toBe(4)
    })

    it('should not purchase when quantity is zero', async () => {
        // set quantity to 0
        await Vehicle.findByIdAndUpdate(vehicleId, {quantity: 0})

        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Vehicle out of stock')
    })

    it('should not purchase without token', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)

        expect(res.statusCode).toBe(401)
    })

    it('should return 404 for non existing vehicle', async () => {
        const fakeId = new mongoose.Types.ObjectId()

        const res = await request(app)
            .post(`/api/vehicles/${fakeId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.statusCode).toBe(404)
    })

})

// ----------------------
// RESTOCK TESTS
// ----------------------

describe('POST /api/vehicles/:id/restock', () => {

    it('should restock a vehicle and increase quantity', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({quantity: 10})

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Vehicle restocked successfully')
        expect(res.body.vehicle.quantity).toBe(15)
    })

    it('should not restock without quantity in body', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({})

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Please provide quantity to restock')
    })

    it('should not restock when normal user', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({quantity: 10})

        expect(res.statusCode).toBe(403)
    })

    it('should not restock without token', async () => {
        const res = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .send({quantity: 10})

        expect(res.statusCode).toBe(401)
    })

})