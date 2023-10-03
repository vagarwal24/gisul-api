import express from 'express';
import multer from 'multer';
import {
  blog_details,
  createBlogger,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from '../../controllers/blog/blogController.js';

const router = express.Router();

// Multer Configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/uploads/blogs/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)    
  }
})


const upload = multer({ storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024 // 4MB file size limit
  }
})


// Private Routes
router.post('/blog/blogs-insert', upload.fields([{ name: 'images', maxCount: 1 }, { name: 'featured_image', maxCount: 1 }]), createBlogger);
// console.log(upload) 
router.get('/blog/get-all-blogs', getAllBlogs);
router.get('/blog-single/:blogId', blog_details);
router.delete('/blog-delete/:blogId', deleteBlog);
router.put('/blog-update/:blogId', upload.fields([{ name: 'images', maxCount: 1 }, { name: 'featured_image', maxCount: 1 }]), updateBlog);

export default router;
