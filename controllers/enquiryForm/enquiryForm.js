import Enquiry from "../../models/enquiryForm/enquiryForm.js";
import Category from "../../models/category/category.js";

// ------------------------------
// Create a Content-Form
// ------------------------------
export const createEnquiry = async (req, res) => {
  const {
    first_name,
    last_name,
    email_id,
    contact_num,
    organization,
    job_role,
    program_category
  } = req.body;

  // Check if the 'organization' field is provided
  // if (!organization) {
  //   return res.status(400).json({ error: 'Organization is required.' });
  // }

  try {
    // let categoryObj;

    // if (program_category.length === 24) {
    //   // If the category is provided as an ID
    //   categoryObj = await Category.findById(program_category);
    // } else {
    //   // If the category is provided as a name
    //   categoryObj = await Category.findOne({ name: program_category });
    // }

    // if (!categoryObj) {
    //   return res.status(404).json({ error: 'Category not found.' });
    // }

    const enquiry = new Enquiry({
      first_name,
      last_name,
      email_id,
      contact_num,
      organization,
      job_role,
      program_category
      // program_category: categoryObj._id, // Set the program_category field with the category's ObjectId
      // program_category_name: categoryObj.name // Set the program_category_name field with the category's name
    });
    

    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new enquiry.' });
  }
};


// ------------------------------
// Get all Contents Form
// -----------------------------
export const getAllEnquiry = async (req, res) => {
    try {
      const allEnquiry = await Enquiry.find();
      res.status(200).json(allEnquiry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve enquiry.' });
    }
};

// ----------------------------
// Single Content Form
// ----------------------------
// export const getSingleContent = async (req, res) => {
//     const contentId = req.params.contentId;
//     // console.log('----check', contentId)
//     try {
//       const singleContent = await Content.findById(contentId);
      
//       if (!singleContent) {
//         return res.status(404).json({ error: 'Content not found.' });
//       }
  
//       res.status(200).json(singleContent);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve the content.' });
//     }
// };

// --------------------------------
// Update Content Form
// --------------------------------
// export const updateContent = async (req, res) => {
//   try {
//     const content = {
//       title: req.body.title,
//       description: req.body.description,
//       category: req.body.category,
//       tags: req.body.tags.split(',').map(tag => tag.trim())
//     };
//     const updatedContent = await Content.findByIdAndUpdate(
//       { _id: req.params.contentId },
//       content,
//       { new: true }
//     );

//     if (!updatedContent) {
//       return res.status(404).json({ message: 'Content not found' });
//     }

//     res.status(200).json(updatedContent);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// -------------------------
// Delete Content Form
// -------------------------
// export const deleteContent = async (req, res) => {
//     const contentId = req.params.contentId;
  
//     try {
//       const deletedContent = await Content.findByIdAndDelete(contentId);
  
//       if (!deletedContent) {
//         return res.status(404).json({ error: 'Content not found.' });
//       }
  
//       res.status(200).json({ message: 'Content deleted successfully.' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to delete the content.' });
//     }
//   };
