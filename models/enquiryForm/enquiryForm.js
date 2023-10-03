import mongoose from "mongoose";
import Category from "../../models/category/category.js";

// -------------------------------
// Define the content schema
// -------------------------------
const enquirySchema = new mongoose.Schema({
    first_name:{
      type: String,
      required: true
    },
    last_name:{
      type: String,
      required: true
    },
    email_id:{
      type: String,
      required: true
    },
    contact_num:{
      type: String,
      required: true
    },
    organization:{
      type: String,
      // required: true
    },
    job_role:{
      type: String,
      // required: true
    },
    program_category:{
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: 'Category',
      // required: true
    },
  //   program_category_name:{
  //     type:String,
  //     // required:true
  // },
  });
  
//-----------------------------------   
// Create the Content model
//----------------------------------
  const Enquiry = mongoose.model('Enquiry', enquirySchema);
  
  export default Enquiry
