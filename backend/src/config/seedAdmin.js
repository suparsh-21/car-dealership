const User = require('../models/User')
const bcrypt = require('bcryptjs')

const seedAdmin = async () => {
    try {
        const adminsToSeed = [
            {
                name: 'System Admin',
                email: process.env.ADMIN_EMAIL || 'admin@autovault.com',
                password: process.env.ADMIN_PASSWORD || 'Admin@12345'
            },
            {
                name: 'AutoVault Admin',
                email: 'admin@dealership.com',
                password: 'admin123'
            }
        ]

        for (const item of adminsToSeed) {
            const hashedPassword = await bcrypt.hash(item.password, 10)
            const existingUser = await User.findOne({ email: item.email })

            if (!existingUser) {
                await User.create({
                    name: item.name,
                    email: item.email,
                    password: hashedPassword,
                    role: 'admin'
                })
                console.log(`🔑 Default Admin Account seeded: ${item.email}`)
            } else {
                existingUser.password = hashedPassword
                existingUser.role = 'admin'
                await existingUser.save()
                console.log(`🔑 Default Admin Account verified & reset: ${item.email}`)
            }
        }
    } catch (error) {
        console.error('Error seeding default admin:', error.message)
    }
}

module.exports = seedAdmin
