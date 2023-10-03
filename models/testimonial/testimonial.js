import mongoose from 'mongoose';


// ----------------------------
// Testimonial
// ----------------------------
const testimonialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// ------------------------
// Testimonial Model
// ------------------------
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
