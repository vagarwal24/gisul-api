import mongoose from 'mongoose';
import Category from '../../models/category/category.js'

// ---------------------
// Schema of Blog
// ---------------------
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sub_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  left_description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  category_name:{
    type:String,
    required:true,
  },
  tags: [{
    type: String,
    required: true,
  }],
  name: {
    type: String,
    required: true,
  },
  person_position: {
    type: String,
    required: true,
  },
  featured_image: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
