import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }
}, { _id: false });


const purchaseSchema = new mongoose.Schema({
    purchase_datetime: { type: Date, required: true },
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    cart: { type: cartSchema },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
}, { timestamps: true });


cartSchema.pre('find', function () {
    this.populate('carts.cart');
});

export default mongoose.model("Purchases", purchaseSchema);