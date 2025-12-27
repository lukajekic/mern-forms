const { default: mongoose } = require('mongoose')
const FormsModel = require('../models/FormsModel')


const getForms = async (req, res) => {
  try {

    let items2 = await FormsModel.aggregate([
      // Lookup responses
      {
        $lookup: {
          from: "responses",
          localField: "_id",
          foreignField: "form",
          as: "responses",
        }
      },

      // Lookup owner
      {
        $lookup: {
          from: 'users',
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        }
      },

      // Flatten owner (lookup ALWAYS returns array)
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      },

      // Add response count
      {
        $addFields: {
          responseCount: { $size: "$responses" }
        }
      },

      // Filter forms by owner
      {
        $match: {
          "owner._id": new mongoose.Types.ObjectId(req.user.id)
        }
      },

      // Remove responses array
      {
        $project: {
          responses: 0
        }
      }
    ])

    return res.status(200).json(items2)

  } catch (error) {
    return res.status(500).json({ "error": error.message })
  }
}


const getForm = async(req,res)=>{
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).json({"message": "ID not specified"})
    }

    const item = await FormsModel.findById(id).populate('owner')
    if (!item) {
      res.status(400).json({"message": "Form Not Found"})
    }

    

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
}

const createForm = async(req,res)=>{
    try {
        const {title, description, fields, status} = req.body

        if (!req.body || !title  || !fields || !status) {
            res.status(400).json({"message": "Missing required fields for creating the form."})
        }
        const newForm = FormsModel({title, description, owner: req.user.id, fields, status})
        await newForm.save()

        res.status(201).json(newForm)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}


const updateForm = async(req,res)=>{
    try {
        const {id, ...ostalo} = req.body

        if (!req.body || !id) {
            res.status(400).json({"message": "Missing required fields for creating the form."})
        }

        const updateData = {}
        for (const key in ostalo) {
          if (ostalo[key] !== undefined) {
        updateData[key] = ostalo[key];
    }
        }

        console.log(updateData)
        const newForm = await FormsModel.findByIdAndUpdate(id, updateData, {new: true})

        res.status(200).json(newForm)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}


const deleteForm = async(req, res)=>{
    try {
        const {id} = req.body

        if (!id) {
            res.status(400).json({"message": "Missing Form ID"})
        }

        await FormsModel.findByIdAndDelete(id)
        //IMPORTANT: ADD DELETEING REFERENCED RESPONSES
        res.status(200).json({"message": "Deleted Successfully"})
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

const UserModel = require('../models/UserModel')
const userFavourites = async (req, res) => {
  try {
    const userID = req.user.id;
    console.log("userid:", userID)
    if (!userID) {
      return res.status(400).json({ message: "Missing User ID, try logging in again" });
    }

    const user = await UserModel.findById(userID);
    console.log(user)
    if (!user || !user.favourites) {
      return res.status(400).json({ message: "No favourites found" });
    }

    const items = await FormsModel.find({ owner: userID });
    const filteredItems = items.filter(item =>
      user.favourites.map(fav => fav.toString()).includes(item._id.toString())
    );

    res.status(200).json(filteredItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = {getForms, createForm, updateForm, deleteForm, userFavourites, getForm}