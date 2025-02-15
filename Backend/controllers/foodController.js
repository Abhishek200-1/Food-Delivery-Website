import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Food not added successfully"})
    }
}


// all food list
const listfood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Food List Not Found"})
    }
}

// remove food item
const removeFood = async (req,res) =>{
    try {
        // by this we are searchin the data
        const food = await foodModel.findById(req.body.id);
        // by this we can delete image data 
        fs.unlink(`uploads/${food.image}`, ()=> {})
        // by this we are deletinng all data
        await foodModel.findOneAndDelete(req.body.id);
        res.json({success:true, message:"Food removed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Food not removed successfully"})
    }
}

export {addFood,listfood,removeFood}