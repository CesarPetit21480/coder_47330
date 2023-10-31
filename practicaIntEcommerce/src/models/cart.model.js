import mongoose, { Schema } from "mongoose";


const Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true },
    stock: { type: String, required: true },
    category: { type: String, required: true },
}, { _id: false });

const cartSchema = new mongoose.Schema({
    productos: [{ type: Product, required: true }]
}, { timestamps: true });

export default mongoose.model("Carts", cartSchema);