const usercontrollers = require("../controllers/UserControllers")
const express = require('express')
const router = express.Router()
const protect = require('../middleware/APIProtect')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, path.join(__dirname, '../uploads'))
    },

    filename: (req, file, callback) =>{
        callback(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})


router.post('/login', usercontrollers.Login)
router.post('/register', upload.single('avatar'), usercontrollers.Register)
router.post('/logout', usercontrollers.Logout)
router.get('/data', protect, usercontrollers.userData)
router.post('/checklogin', protect, usercontrollers.checkLogin)
router.post('/favourites/:formid', protect, usercontrollers.addToFavourites)
router.delete('/favourites/:formid', protect, usercontrollers.removeFromFavourites)





const fs = require('fs')
router.get('/avatar/:name', (req,res)=>{
    const file = path.join(__dirname, `../uploads/${req.params.name}`)
    const avatar_basic = path.join(__dirname, `../uploads/avatarbasic.png`)
    if (fs.existsSync(file)) {
        res.sendFile(file)
    } else {
        res.sendFile(avatar_basic)
    }
})

module.exports = router
