const express = require('express')
const router = express.Router()
const {purchaseVehicle, restockVehicle} = require('../controllers/inventoryController')
const verifyToken = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/adminMiddleware')

// POST /api/vehicles/:id/purchase
router.post('/:id/purchase', verifyToken, purchaseVehicle)

// POST /api/vehicles/:id/restock — admin only
router.post('/:id/restock', verifyToken, isAdmin, restockVehicle)

module.exports = router