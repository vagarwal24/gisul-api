import Testimonial from '../../models/testimonial/testimonial.js';

// --------------------------
// Create a testimonial
// --------------------------
export const createTestimonial = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    console.log('----->', req.body);
    
    // Correct destructuring to get the uploaded image~
    const { path: imagePath } = req.file;
    console.log('----->', imagePath);

    // Validate required fields
    if (!title || !imagePath) {
      return res.status(400).json({ error: 'Title and images are required' });
    }

    const testimonial = new Testimonial({
      title,
      content,
      author,
      images: imagePath, // Use the correct variable name for the image path
    });

    await testimonial.save();

    res.status(201).json({ message: 'Testimonial created successfully', testimonial });
  } catch (error) {
    console.error(error); // Log the specific error for debugging purposes
    res.status(500).json({ error: 'Something went wrong' });
  }
};




// --------------------------------
// Get a specific testimonial
// --------------------------------
export const getTestimonial = async (req, res) => {
    try {
      const { testimonialid } = req.params;
      const testimonial = await Testimonial.findById(testimonialid);
    
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
//   ---------------------------
// Get all testimonials
//--------------------------
  export const getAllTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };


// --------------------------
// Update a testimonial
// --------------------------

export const updateTestimonial = async (req, res) => {
  try {
    const { testimonialid } = req.params;
    const { title, content, author } = req.body;
    // Correct destructuring to get the uploaded image~
    const { path: imagePath } = req.file;
    console.log('----->', imagePath);

    // ---------------------------
    // Validate required fields
    // ---------------------------
    if (!title || !imagePath) {
      return res.status(400).json({ error: 'Title and images are required' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(testimonialid, {
      title,
      content,
      author,
      images: imagePath,
    });

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial updated successfully', testimonial });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ---------------------------
// Delete a testimonial
// -----------------------------


export const deleteTestimonial = async (req, res) => {
  try {
    const { testimonialid } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(testimonialid);

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
