const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['sedan', 'suv', 'truck', 'coupe', 'hatchback', 'convertible']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Vehicle', vehicleSchema)