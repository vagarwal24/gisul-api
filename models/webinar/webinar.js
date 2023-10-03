import mongoose from 'mongoose';

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
    // You might want to add custom validation for time format
  },
});

const Webinar = mongoose.model('Webinar', webinarSchema);

export default Webinar;
