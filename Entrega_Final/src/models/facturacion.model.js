import mongoose, { Schema } from "mongoose";


const ProductsItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 0 }
}, { _id: false });

const facturacionSchema = new mongoose.Schema({

    fecha: { type: String, required: true },
    email: { type: String, required: true },
    direccion: { type: String, required: true },
    total: { type: Number, default: 0 },
    products: { type: [ProductsItemSchema], default: [] }
}, { timestamps: true });


facturacionSchema.pre('find', function () {
    this.populate('products.product');
});

export default mongoose.model("Facturacion", facturacionSchema);