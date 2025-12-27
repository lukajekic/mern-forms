const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token = req.cookies.token

    if (!token) {
        return res.status(401).json({"message": "Not Authenticated, Missing Token."})
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (decoded) {
                const user = await UserModel.findById(decoded.id).select('-password')
                req.user = user
                next()
            }
        } catch (error) {
            return res.status(401).json({"message": "Not Authenticated, Invalid Token."})
        }
    }
})

module.exports = protect