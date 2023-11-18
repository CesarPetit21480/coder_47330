import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  rol: { type: String, required: true },
  provider: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);