import Course from '../../models/course/courseModel.js';
import { validationResult } from 'express-validator';
import Category from '../../models/category/category.js';

// ------------------
// Create a Course
// ------------------
export const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      course_name,
      details,
      duration,
      professional,
      pre_requisite,
      program_highlights,
      course_module,
      instructor,
      skill_covered,
      category,
      program_description,
      skill_level,
    } = req.body;
    console.log('------>',req.body)
    const { video, syllabus_links, course_images, instructor_image } =
      req.files;

    // Check if the instructor_image field is present in the request files
    if (!instructor_image) {
      return res.status(400).json({ error: 'Instructor image is missing.' });
    }

    let categoryObj;
    if (category.length === 24) {
      categoryObj = await Category.findById(category);
    } else {
      categoryObj = await Category.findOne({ name: category });

      if (!categoryObj) {
        categoryObj = new Category({ name: category });
        await categoryObj.save();
      }
    }

    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const instructorDetail = {
      name: instructor[0].name,
      description: instructor[0].description,
      image: instructor_image[0].path,
    };

    const moduleDetails = {
      title: course_module[0].title,
      description: course_module[0].description,
    };

    const durationDetail = {
      months: duration[0].months,
      hoursPerDay: duration[0].hoursPerDay,
    };

    const course = new Course({
      video: video[0].path,
      course_name,
      details,
      duration: [durationDetail],
      professional,
      pre_requisite,
      program_highlights,
      course_module: [moduleDetails],
      instructor: [instructorDetail],
      skill_covered,
      category: categoryObj._id,
      category_name: categoryObj.name,
      program_description,
      syllabus_links: syllabus_links.map((link) => link.path),
      course_images: course_images.map((image) => image.path),
      skill_level,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new course.' });
  }
};



// --------------------
// Get All Courses
// --------------------
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve courses.' });
  }
};

// ----------------------
// Get a Single Course
// -----------------------
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the course.' });
  }
};


// ------------------------
// Update a Course
// ------------------------

export const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseId = req.params.courseId;
    const {
      course_name,
      details,
      duration,
      professional,
      pre_requisite,
      program_highlights,
      course_module,
      instructor,
      skill_covered,
      category,
      program_description,
      skill_level,
    } = req.body;

    const { video, syllabus_links, course_images, instructor_image } = req.files;

    let categoryObj;
    if (category.length === 24) {
      categoryObj = await Category.findById(category);
    } else {
      categoryObj = await Category.findOne({ name: category });

      if (!categoryObj) {
        categoryObj = new Category({ name: category });
        await categoryObj.save();
      }
    }

    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const instructorDetail = {
      name: instructor?.[0]?.name,
      description: instructor?.[0]?.description,
      image: instructor_image?.[0]?.path,
    };

    const moduleDetails = {
      title: course_module?.[0]?.title,
      description: course_module?.[0]?.description,
    };

    const durationDetail = {
      months: duration?.[0]?.months,
      hoursPerDay: duration?.[0]?.hoursPerDay,
    };

    const updatedCourse = {
      video: video?.[0]?.path,
      course_name,
      details,
      duration: [durationDetail],
      professional,
      pre_requisite,
      program_highlights,
      course_module: [moduleDetails],
      instructor: [instructorDetail],
      skill_covered,
      category: categoryObj._id,
      category_name: categoryObj.name,
      program_description,
      syllabus_links: syllabus_links.map((link) => link.path),
      course_images: course_images.map((image) => image.path),
      skill_level,
    };

    const updatedCourseResult = await Course.findByIdAndUpdate(
      courseId,
      updatedCourse,
      { new: true }
    );

    if (!updatedCourseResult) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    res.status(200).json(updatedCourseResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the course.' });
  }
};







// --------------------
// Delete a Course
// --------------------
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.json({ message: 'Course deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the course.' });
  }
};
