const express = require('express')
const router = express.Router()
const {addVehicle, getAllVehicles, searchVehicles, updateVehicle, deleteVehicle} = require('../controllers/vehicleController')
const verifyToken = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/adminMiddleware')

// must be before /:id route
router.get('/search', verifyToken, searchVehicles)

router.get('/', verifyToken, getAllVehicles)
router.post('/', verifyToken, addVehicle)
router.put('/:id', verifyToken, updateVehicle)
router.delete('/:id', verifyToken, isAdmin, deleteVehicle)

module.exports = router