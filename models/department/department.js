import mongoose from 'mongoose';

// -------------------
// Define Schema
// -------------------
const departmentSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
})



// ----------------------
// Department Model
// -----------------------
const Department = mongoose.model('Department', departmentSchema);

export default Department;