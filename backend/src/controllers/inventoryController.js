const Vehicle = require('../models/Vehicle')

const purchaseVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { _id: req.params.id, quantity: { $gt: 0 } },
            { $inc: { quantity: -1 } },
            { new: true }
        )

        if (!vehicle) {
            const existingVehicle = await Vehicle.findById(req.params.id)
            if (!existingVehicle) {
                return res.status(404).json({ message: 'Vehicle not found' })
            }
            return res.status(400).json({ message: 'Vehicle out of stock' })
        }

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