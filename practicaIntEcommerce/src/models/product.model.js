import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },  
    code: { type: String, required: true },
    stock: { type: String, required:true },
    category: { type: String, required:true },
  
}, { timestamps: true }); 

export default mongoose.model("Product", productSchema);