import mongoose from "mongoose";

// -------------------------
// Define a Schema of FAQ
// -------------------------
const faqSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      }
})


// ---------------------------
// Define a FAQ Model
// ---------------------------
const FAQ = mongoose.model('faq', faqSchema)

export default FAQ