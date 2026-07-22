const Vehicle = require('../models/Vehicle')
const seedVehicles = require('../config/seedVehicles')

const addVehicle = async (req, res) => {
    const {make, model, category, price, quantity, year, description, imageUrl} = req.body

    if(!make || !model || !category || !price || !quantity || !year){
        return res.status(400).json({message: 'Please fill all required fields'})
    }

    try {
        const vehicle = await Vehicle.create({
            make, model, category, price, quantity, year, description, imageUrl
        })

        res.status(201).json({message: 'Vehicle added successfully', vehicle})

    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const getAllVehicles = async (req, res) => {
    try {
        await seedVehicles()
        const vehicles = await Vehicle.find()
        res.status(200).json({vehicles})
    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const searchVehicles = async (req, res) => {
    const {make, model, category, minPrice, maxPrice} = req.query

    let query = {}

    if(make) query.make = {$regex: make, $options: 'i'}
    if(model) query.model = {$regex: model, $options: 'i'}
    if(category) query.category = category
    if(minPrice || maxPrice){
        query.price = {}
        if(minPrice) query.price.$gte = Number(minPrice)
        if(maxPrice) query.price.$lte = Number(maxPrice)
    }

    try {
        await seedVehicles()
        const vehicles = await Vehicle.find(query)
        res.status(200).json({vehicles})
    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        if(!vehicle){
            return res.status(404).json({message: 'Vehicle not found'})
        }

        res.status(200).json({message: 'Vehicle updated successfully', vehicle})

    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id)

        if(!vehicle){
            return res.status(404).json({message: 'Vehicle not found'})
        }

        res.status(200).json({message: 'Vehicle deleted successfully'})

    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

module.exports = {addVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle}