import mongoose from 'mongoose';
import Category from '../category/category.js';

// ---------------------
// Schema of Courses
// ---------------------
const courseSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  duration: [{
    months: {
      type: Number,
      required: true,
    },
    hoursPerDay: {
      type: Number,
      required: true,
    },
  }],
  professional: {
    type: String,
    required: true,
  },
  pre_requisite: {
    type: [String],
    required: true,
  },
  program_highlights: {
    type: [String],
    required: true,
  },
  course_module: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  instructor: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  }],
  skill_level: {
    type: [String], // Beginner, Intermediate, Advanced
    required: true,
  },
  skill_covered: {
    type: [String],
    required: true,
  },
  category_name:{
    type:String,
    required:true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  program_description: {
    type: [String],
    required: true,
  },
  syllabus_links: {
    type: [String], // Change the type to an array of strings
    required: true,
  },
  course_images: {
    type: [String], // Change the type to an array of strings
    required: true,
  },
});

// ----------------------
// Model of Course
// ----------------------
const Course = mongoose.model('Course', courseSchema);

export default Course;
