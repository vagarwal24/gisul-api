import mongoose from 'mongoose';

// ------------------------
// Category Schema
// -------------------------
const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['blog', 'faq', 'course'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
});


// ----------------------
// Category Model
// -----------------------
const Category = mongoose.model('Category', categorySchema);

export default Category;
