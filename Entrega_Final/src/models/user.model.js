import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'PUBLIC', enum: ['PUBLIC', 'USER', 'ADMIN','PREMIUN'] },
  provider: String,
  connectedTo: {
    type: Date,
    default: Date.now   
  }
}, { timestamps: true });

userSchema.plugin(mongoosePaginate)

export default mongoose.model('Users', userSchema);