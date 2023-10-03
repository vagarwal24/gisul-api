import mongoose from 'mongoose';

// ----------------------
// Schema of Admin
// ----------------------
const adminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  password_confirmation: { type: String, required: true }, // Add password confirmation field
  email: { type: String, required: true },
  token: { type: String }
});

// -------------------
// Model of Admin
// -------------------
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
