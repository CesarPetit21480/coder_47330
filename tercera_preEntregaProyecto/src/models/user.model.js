import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'regular', enum: ['regular', 'seller', 'admin'] },
  provider: String,
}, { timestamps: true });

export default mongoose.model('Users', userSchema);