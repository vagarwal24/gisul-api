import Blog from "../../models/blog/blogModel.js"; // Import the Blog model from the appropriate path
import Category from "../../models/category/category.js";

// -------------------
// Create a Blog
// -------------------

export const createBlogger = async (req, res) => {
  const { title, sub_title, description, left_description, category, tags, name, person_position } = req.body;

  // Make sure to properly define the featured_image and images variables
  const featuredImagePath = req.files['featured_image'][0].path;
  const imagePaths = req.files['images'].map(image => image.path);

  if (!title || !sub_title || !description || !category || !tags || !name || !person_position || !left_description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(409).json({ error: 'Blog with the same title already exists.' });
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

    const tagsArray = Array.isArray(tags) ? tags.map(tag => tag.trim()) : [];

    const blog = new Blog({
      title,
      sub_title,
      featured_image: featuredImagePath,
      description,
      left_description,
      images: imagePaths,
      category: categoryObj._id,
      category_name: categoryObj.name,
      tags: tagsArray,
      name,
      person_position
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new blog.' });
  }
};


// --------------------
// Get All Blogs
// --------------------

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().lean();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
}

// --------------------
// Get a Single Blog
// --------------------
export const blog_details = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the blog.' });
  }
};

// ------------------
// Update a Blog
// ------------------
export const updateBlog = async (req, res) => {
  const blogId = req.params.blogId;
  console.log('----->', blogId);
  const { title, sub_title, description, left_description, category, tags, name, person_position } = req.body;
  // Make sure to properly define the featured_image and images variables
  const featuredImagePath = req.files['featured_image'] ? req.files['featured_image'][0].path : null;
  const imagePaths = req.files['images'] ? req.files['images'].map(image => image.path) : [];
  console.log('---->', req.files);
  if (!title || !sub_title || !description || !left_description || !category || !tags || !name || !person_position) {
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

    // Debug Logging: Check the received and processed tags
    console.log('Received tags:', tags);
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : (Array.isArray(tags) ? tags.map(tag => tag.trim()) : []);
    console.log('Processed tags:', tagsArray);

    const blogUpdate = {
      title,
      sub_title,
      description,
      left_description,
      category: categoryObj._id,
      category_name: categoryObj.name,
      tags: tagsArray,
      name,
      person_position,
      images: imagePaths,
      featured_image: featuredImagePath
    };

    // Debug Logging: Check the tags in the blogUpdate object
    console.log('Updated blog object tags:', blogUpdate.tags);

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogUpdate, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the blog.' });
  }
};




// ----------------
// Delete a Blog
// ----------------
export const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the blog.' });
  }
};
