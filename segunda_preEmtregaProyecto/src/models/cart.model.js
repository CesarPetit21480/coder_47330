import mongoose, { Schema } from "mongoose";


const ProductsItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
}, { _id: false });


const cartSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  products: { type: [ProductsItemSchema], default: [] }
}, { timestamps: true });


cartSchema.pre('find', function () {
  this.populate('products.product');
});

export default mongoose.model("Carts", cartSchema);