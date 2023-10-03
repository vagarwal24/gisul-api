import mongoose from "mongoose";
import Department from "../department/department.js";

// -----------------
// Define Schema
// --------------------

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  location: {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  job_profile: {
    type: String,
    required: true,
  },
  job_responsibilities: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  job_code: {
    type: [String],
    default: [],
  },
  posted_date: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  department_name:{
    type:String,
    required:true,
  }
});

// ---------------------
// Define Job Model
// ---------------------

const Job = mongoose.model("job", jobSchema);

export default Job;
