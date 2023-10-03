import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../../controllers/category/category.js';
import multer from 'multer';

const router = express.Router();


// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/uploads/category/'); // Set the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + file.originalname);
  }
  });

  const upload = multer({ storage: storage,
    limits: {
      fileSize: 30 * 1024 * 1024 // 50MB file size limit
    }
  })


// Create a new category
router.post('/category/category-insert', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createCategory);

// Get all categories
router.get('/category/get-all-category', getAllCategories);

// Get a category by ID
router.get('/category-single/:categoryId', getCategoryById);

// Update a category
router.put('/category-update/:categoryId', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), updateCategory);

// Delete a category
router.delete('/category-delete/:categoryId', deleteCategory);

export default router;
