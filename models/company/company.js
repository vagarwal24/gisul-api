import mongoose from 'mongoose';

// ------------------------
// Company of Schema
// -------------------------
const companySchema = new mongoose.Schema({
    image: {
    type: String,
    required: true,
  },
});

// ----------------------
// Model of Company
// -----------------------
const Company = mongoose.model('Company', companySchema);

export default Company;
