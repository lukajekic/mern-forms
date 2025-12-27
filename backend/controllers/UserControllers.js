const mognoose = require('mongoose')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')




const Register = async(req,res) =>{
    try {
        const {email, password, name} = req.body
        const favourites = []
        if (!email || !password || !name) {
            return res.status(400).json({"message": "Missing all information required for User Signup."})
        }
        const salt = await bcrypt.genSalt(10)
        const encryptedpass = await bcrypt.hash(password, salt)

        console.log(req.file)

        const filename = req.file?.filename || "avatarbasic.png"
        const newuser = new UserModel({email, password: encryptedpass, name, profilePicture: filename, favourites})
        await newuser.save()

        res.cookie("token", GENERATEJWT(newuser._id), {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        
        return res.status(201).json({"message": "User registered successfully.", "user": {id: newuser._id, email: newuser.email, name: newuser.name, profilePicture: filename}})
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}


const Login = async(req,res)=>{
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email})

        if (!user) {
            return res.status(400).json({"message": "Wrong email or password."})
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (isPasswordCorrect) {
            res.cookie("token", GENERATEJWT(user._id), {
                maxAge: 86400000,
                secure: true,
                httpOnly: true,
                sameSite: "none"
            })

            return res.status(200).json({"message": "Login Successful.", "user": {id: user._id, email: user.email, name: user.name}})
        } else{
            return res.status(400).json({"message": "Wrong email or password."})
        }
        
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}

const Logout = async(req, res)=>{
    res.cookie("token", '', {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    return res.status(200).json({"message": "Logged out successfully."})
}


const checkLogin = async(req, res)=>{
    return res.status(200).json({"message": "User is authenticated.", "user": {id: req.user._id, email: req.user.email, name: req.user.name}})
}


const userData = async(req, res)=>{
    try {
        const id = req.user.id
        let user = await UserModel.findById(id).select('-password')
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

const addToFavourites = async(req, res)=>{
    try {
        const userID = req.user.id
        const formID = req.params.formid

        if (!userID || !formID) {
            return res.status(400).json({"message": "Missing userID or formIF"})
        }
        let updated = await UserModel.findByIdAndUpdate(userID, {$push: {favourites: formID}}, {new: true}).select('-password')

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}



const removeFromFavourites = async(req, res)=>{
    try {
        const userID = req.user.id
        const formID = req.params.formid

        if (!userID || !formID) {
            return res.status(400).json({"message": "Missing userID or formIF"})
        }
        let updated = await UserModel.findByIdAndUpdate(userID, {$pull: {favourites: formID}}, {new: true}).select('-password')

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}

function GENERATEJWT(id) {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {Login, Register, Logout, checkLogin, userData, addToFavourites, removeFromFavourites}