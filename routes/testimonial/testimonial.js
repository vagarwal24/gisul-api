import express from 'express';
import {
  createTestimonial,
  getTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial
} from '../../controllers/testimonial/testimonial.js';
import multer from 'multer'


const router = express.Router();

// Multer Configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/uploads/testimonial/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)    
  }
})


const upload = multer({ storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 4MB file size limit
  }
})

//----------------------------- 
// Create a testimonial
// -----------------------------
router.post('/testimonial/testimonial-insert', upload.single('images'),createTestimonial);


// -----------------------------
// Get all testimonials
// -----------------------------
router.get('/testimonial/get-all-testimonial', getAllTestimonials);


// --------------------------------
// Get a specific testimonial
// --------------------------------
router.get('/testimonial/:testimonialid', getTestimonial);


// -------------------------
// Update a testimonial
// --------------------------
router.put('/testimonial-update/:testimonialid', upload.single('images'), updateTestimonial);

// ---------------------------
// Delete a testimonial
// -------------------------------
router.delete('/testimonial-delete/:testimonialid', deleteTestimonial);

export default router;
