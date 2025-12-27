const responsesController = require('../controllers/ResponsesController')
const express = require("express")
const router = express.Router()
const protect = require('../middleware/APIProtect')

router.get('/:id', protect, responsesController.getSingleResponse)
router.get('/', protect, responsesController.getAllResponses)
router.post('/', responsesController.createResponse)
router.put('/', protect, responsesController.updateResponse)
router.delete('/', protect, responsesController.deleteResponse)




module.exports = router