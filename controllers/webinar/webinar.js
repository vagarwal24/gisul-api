import Webinar from '../../models/webinar/webinar.js';

// -----------------------------
// Create a Webinar
// ------------------------------
export const createWebinar = async (req, res) => {
    try {
      const { title, description, date, time } = req.body;
      console.log('---->', req.body)
      // Correct destructuring to get the uploaded image
      const { path: imagePath } = req.file;
        // console.log('------>', req.file)
      // Validate required fields
      if (!title || !imagePath || !description || !date || !time) {
        return res.status(400).json({ error: 'Title, description, image, date, and time are required' });
      }
  
      const newWebinar = new Webinar({
        title,
        description,
        image: imagePath,
        date,
        time,
      });
  
      const savedWebinar = await newWebinar.save();
  
      res.status(201).json({ message: 'Webinar created successfully', webinar: savedWebinar });
    } catch (error) {
      console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: 'Something went wrong' });
    }
  };



// --------------------------------
// Get all Webinar
// --------------------------------
export const getWebinars = async (req, res) => {
    try {
      const webinars = await Webinar.find();
      res.status(200).json(webinars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};



// --------------------------------
// Update a Webinar
// --------------------------------

export const updateWebinar = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;
    const webinarId = req.params.id;
    console.log('---->', req.body);

    const existingWebinar = await Webinar.findById(webinarId);

    if (!existingWebinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }

    if (req.file) {
      // If a file was uploaded, get the image path
      const imagePath = req.file.path;
      
      // Update the webinar data
      existingWebinar.image = imagePath;
    }

    // Update other fields
    existingWebinar.title = title;
    existingWebinar.description = description;
    existingWebinar.date = date;
    existingWebinar.time = time;

    const updatedWebinar = await existingWebinar.save();

    res.status(200).json({ message: 'Webinar updated successfully', webinar: updatedWebinar });
  } catch (error) {
    console.error(error); // Log the specific error for debugging purposes
    res.status(500).json({ error: 'Something went wrong' });
  }
};



// -----------------------------
// Delete a Webinar
// -----------------------------
export const deleteWebinar = async (req, res) => {
    try {
      const deletedWebinar = await Webinar.findByIdAndRemove(req.params.id);
  
      if (!deletedWebinar) {
        return res.status(404).json({ message: 'Webinar not found' });
      }
  
      res.status(200).json({ message: 'Webinar deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
