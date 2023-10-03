import mongoose from "mongoose";

// -----------------
// Define Schema
// --------------------
const contactSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact_number: {
      type: Number,
      required: true
    },
    message: {
        type: String,
        required: true
    }
    });
    

// ---------------------
// Define Contect Model
// ---------------------

const Contact = mongoose.model('Contact',contactSchema);

export default Contact