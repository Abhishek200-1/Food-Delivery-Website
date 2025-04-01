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

const updateFood = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;
        let image_filename = null;

        // If a new image is uploaded, process it
        if (req.file) {
            // If the food already has an image, delete it
            const food = await foodModel.findById(id);
            if (food && food.image) {
                fs.unlink(`uploads/${food.image}`, (err) => {
                    if (err) {
                        console.log("Error deleting old image:", err);
                    }
                });
            }
            image_filename = req.file.filename;  // Set the new image filename
        }

        // Update the food item in the database
        const updatedFood = await foodModel.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image: image_filename || undefined // Keep the old image if no new image is uploaded
        }, { new: true });

        if (updatedFood) {
            res.json({ success: true, message: "Food item updated successfully", data: updatedFood });
        } else {
            res.json({ success: false, message: "Food item not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item", error: error.message });
    }
}

export {addFood,listfood,removeFood, updateFood}