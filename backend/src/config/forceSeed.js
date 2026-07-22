const mongoose = require('mongoose')
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })
const seedVehicles = require('./seedVehicles')

const run = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...')
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://adminuser:admin12345@cluster0.clkicob.mongodb.net/test?authSource=admin')
        console.log('Connected! Executing vehicle seed...')
        await seedVehicles()
        console.log('Successfully seeded default supercars!')
        process.exit(0)
    } catch (err) {
        console.error('Force seed failed:', err)
        process.exit(1)
    }
}

run()
