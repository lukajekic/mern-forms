const formscontroller = require('../controllers/FormsController')
const express = require("express")
const router = express.Router()
const protect = require('../middleware/APIProtect')

router.get('/', protect, formscontroller.getForms)
router.post('/', protect, formscontroller.createForm)
router.put('/', protect, formscontroller.updateForm)
router.delete('/', protect, formscontroller.deleteForm)
router.get('/favourites', protect, formscontroller.userFavourites)
router.get('/fields/:id', formscontroller.getForm)

module.exports = router