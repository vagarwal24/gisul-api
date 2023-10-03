import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../../controllers/course/courseController.js';
import multer from 'multer';

const router = express.Router();

// Multer Configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/uploads/courses/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)    
  }
})


const upload = multer({ storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB file size limit
  }
})

router.post('/course/courses-insert', upload.fields([{ name: 'video', maxCount:1 }, { name:'syllabus_links', maxCount:1 },
 { name:'instructor_image', maxCount:1 }, { name:'course_images', maxCount:1 }]), createCourse); //Create-Course Routes

router.get('/course/get-all-course', getAllCourses); //Get-All-Course Routes

router.get('/course-single/:courseId', getCourseById); //Single-Course Routes

router.put('/course-update/:courseId', upload.fields([{ name: 'video', maxCount:1 }, { name:'syllabus_links', maxCount:1 },
{ name:'instructor_image', maxCount:1 }, { name:'course_images', maxCount:1 }]), updateCourse); //Update-Course Routes

router.delete('/course-delete/:courseId', deleteCourse); //Delete-Course Routes

export default router;


