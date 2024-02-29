import mongoose, { Schema } from "mongoose";


const ProductsItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  quantity: { type: Number, default: 0 }
}, { _id: false });
const rejectCartSchema = new mongoose.Schema({
  fecha: { type: String, required: true }, 
  products: { type: [ProductsItemSchema], default: [] },
  status : { type: Boolean, required: true, default: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
}, { timestamps: true });


ProductsItemSchema.pre('find', function () {
  this.populate('products.product');
});

export default mongoose.model("RejectCart", rejectCartSchema);