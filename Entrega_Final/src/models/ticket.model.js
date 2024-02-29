import mongoose, { Schema } from "mongoose";

const ticketSchema = mongoose.Schema({
    code :  { type: String, unique: true },
    purchase_datetime : { type: Date },
    amount : { type: Number},
    purchaser : { type: String }
}, { timestamps: true });

export default mongoose.model('Tickets', ticketSchema);