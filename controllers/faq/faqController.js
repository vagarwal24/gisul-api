import FAQ from "../../models/faq/faqModel.js";
import Category from "../../models/category/category.js";

// --------------------------
// Create a FAQ 
// --------------------------
export const createFAQ = async (req, res) => {
  const { question, answer, category } = req.body;

  if (!question || !answer || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingFAQ = await FAQ.findOne({ question });
    if (existingFAQ) {
      return res.status(409).json({ error: 'FAQ with the same question already exists.' });
    }

    let categoryObj;
    if (category.length === 24) {
      // If the category is provided as an ID
      categoryObj = await Category.findById(category);
    } else {
      // If the category is provided as a name
      categoryObj = await Category.findOne({ name: category });
    }

    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const faq = new FAQ({
      question,
      answer,
      category_name: categoryObj.name, // Set the category_name field with the category name
      category: categoryObj
    });

    const savedFAQ = await faq.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new FAQ.' });
  }
};

// ----------------
// Get All FAQ
// ----------------
export const getAllFAQs = async (req, res) => {
    try {
      const faqs = await FAQ.find();
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve FAQs.' });
    }
};

// ---------------------
// Get a Single FAQ
// ----------------------
export const faq_details = async(req, res) =>{
    try {
        const faq = await FAQ.findById(req.params.faqId)
        if(!faq){
            return res.status(404).json({error:'FAQ not found'})
        }
        res.status(200).json(faq)
    } catch (error) {
        res.status(500).json({ error:'Failed to retrieve the Faq' })
    }
};


// ---------------------------------
// Update a FAQ
// ---------------------------------
export const updateFAQ = async (req, res) => {
  const { question, answer, category } = req.body;

  if (!question || !answer || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    let categoryObj;
    if (category.length === 24) {
      // If the category is provided as an ID
      categoryObj = await Category.findById(category);
    } else {
      // If the category is provided as a name
      categoryObj = await Category.findOne({ name: category });
    }

    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.faqId,
      {
        question,
        answer,
        category: categoryObj._id,
        category_name: categoryObj.name
      },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    res.status(200).json(updatedFAQ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the FAQ.' });
  }
};



// ------------------------------
// Delete a FAQ
// -------------------------
export const deleteFAQ = async(req, res) =>{
    const faqId = req.params.faqId;

    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(faqId)
        console.log('---check', deleteFAQ)
        if (!deletedFAQ) {
            return res.status(404).json({ error: 'FAQ not found.' })
        }
        res.status(200).json({ message: 'FAQ deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete a FAQ' })
    }
}