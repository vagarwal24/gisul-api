import Category from '../../models/category/category.js';

// -------------------------
// Create a new category
// -------------------------
export const createCategory = async (req, res) => {
  try {
    const { type, name, description } = req.body;

    // Assuming req.files contains the 'image' and 'video' files
    const { image, video } = req.files;

    const category = new Category({
      type,
      name,
      description,
      image: image ? image[0].path : '',
      video: video ? video[0].path : '',
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
};



// -----------------------
// Get all categories
// -----------------------
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
};

// ----------------------------
// Get a category by ID
// ----------------------------
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve category' });
  }
};

// --------------------------
// Update a category
// --------------------------
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { type, name, description } = req.body;

    // Assuming req.files contains the 'image' and 'video' files
    const { image, video } = req.files;

    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Update the category properties
    category.type = type;
    category.name = name;
    category.description = description;
    category.image = image ? image[0].path : category.image;
    category.video = video ? video[0].path : category.video;

    // Save the updated category
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
};



// ----------------------
// Delete a category
// -----------------------
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    console.log('---check', deletedCategory);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
};
