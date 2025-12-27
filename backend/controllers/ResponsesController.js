const { default: mongoose } = require('mongoose')
const ResponsesModel = require('../models/ResponsesModel')


const getAllResponses = async(req, res)=>{
    try {
        let filter = {}
        const form = req.query.form
        if (form && mongoose.Types.ObjectId.isValid(form)) {
            filter.form = form
        }
        let items = await ResponsesModel.find(filter).populate('owner', '-password').populate('form')
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}


const getSingleResponse = async(req, res)=>{
    try {
        let id = req.params.id
        let items = await ResponsesModel.find({owner: req.user.id, _id: id}).populate('owner', '-password').populate('form')
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({"error": error.message})
    }
}

const createResponse = async(req,res)=>{
    try {
        const {values, form} = req.body

        if (!req.body || !values || !form) {
            res.status(400).json({"message": "Missing required fields for creating the response."})
        }
        const newResponse = ResponsesModel({values, form})
        await newResponse.save()

        res.status(201).json(newResponse)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}


const updateResponse = async(req,res)=>{
    try {
        const {id, values, form} = req.body

        if (!req.body || !id) {
            res.status(400).json({"message": "Missing required fields for creating the form."})
        }
        const newResponse = await ResponsesModel.findByIdAndUpdate(id, {values, form}, {new: true})

        res.status(200).json(newResponse)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}


const deleteResponse = async(req, res)=>{
    try {
        const {id} = req.body

        if (!id) {
            res.status(400).json({"message": "Missing Form ID"})
        }

        await ResponsesModel.findByIdAndDelete(id)
        //IMPORTANT: ADD DELETEING REFERENCED RESPONSES
        res.status(200).json({"message": "Deleted Successfully"})
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}


const getQuestionAnalytics = async(req, res)=>{
    const TYPE_MAP = {
  text: "string",
  email: "string",
  url: "string",
  number: "number",
  checkbox: "bool",
  password: "string",
  date: "string",
  time: "string"
};


    const {id, type, formID} = req.query
if (!id || !type || !formID) {
        return res.status(400).json({"message": "Missing ID, Form ID or field type for extracting submissions."})
    }

    const nativetype = TYPE_MAP[type]
    
    if (!nativetype) {
        return res.status(400).json({"message": "Invalid field type"})
    }
try {

    const totalITEMS = await ResponsesModel.countDocuments({form: formID})
        const items = await ResponsesModel.aggregate([
        {
            $match: {
                [`values.${id}`]:
                {
                    $exists: true,
                    $type: nativetype
                }
            }
        },

        {
            $project: {
                _id: 0,
                value: `$values.${id}`
            }
                
            
        }
    ])

    const mapped = items.map(i => i.value)
    console.log(mapped)
const count = {}
if (nativetype === 'string' || nativetype === 'number') {
    for (const m of mapped) {
        count[m] = (count[m] || 0) + 1
    }

    console.log(count)
    return res.status(200).json(count)
} else if (nativetype === 'bool') {
if (mapped.length === 0) {
        return res.status(200).json({
            true: 0,
            false: 0
        });
    }
    const truecount = mapped.filter(item => item === true).length
    const truepercentage = (truecount/totalITEMS)*100


    const falsepercentage = ((totalITEMS-truecount)/totalITEMS)*100

    return res.status(200).json({
        true: truepercentage,
        false: falsepercentage
    })
}

    
} catch (error) {
    res.status(500).json({"error": error.message})
}


}

module.exports = {getAllResponses, getSingleResponse, createResponse, updateResponse, deleteResponse, getQuestionAnalytics}