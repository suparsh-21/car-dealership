const Vehicle = require('../models/Vehicle')

const purchaseVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if(!vehicle){
            return res.status(404).json({message: 'Vehicle not found'})
        }

        if(vehicle.quantity === 0){
            return res.status(400).json({message: 'Vehicle out of stock'})
        }

        vehicle.quantity = vehicle.quantity - 1
        await vehicle.save()

        res.status(200).json({
            message: 'Vehicle purchased successfully',
            vehicle
        })

    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const restockVehicle = async (req, res) => {
    const {quantity} = req.body

    if(!quantity){
        return res.status(400).json({message: 'Please provide quantity to restock'})
    }

    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if(!vehicle){
            return res.status(404).json({message: 'Vehicle not found'})
        }

        vehicle.quantity = vehicle.quantity + quantity
        await vehicle.save()

        res.status(200).json({
            message: 'Vehicle restocked successfully',
            vehicle
        })

    } catch(error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

module.exports = {purchaseVehicle, restockVehicle}