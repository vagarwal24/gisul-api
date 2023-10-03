    import express from 'express';
    import multer from 'multer'; // Import multer for handling file uploads
    import { createWebinar, getWebinars, updateWebinar, deleteWebinar } from '../../controllers/webinar/webinar.js';

    const router = express.Router();

    // Set up storage for uploaded images
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/webinar/'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
    });

    const upload = multer({ storage: storage });

    // Create a webinar
    router.post('/webinars/insert-webinar', upload.single('image'), createWebinar);

    // Get all webinars
    router.get('/webinars/get-all-webinar', getWebinars);

    // Update a webinar
    router.put('/webinars-update/:id', upload.single('image'), updateWebinar);

    // Delete a webinar
    router.delete('/webinars-delete/:id', deleteWebinar);

    export default router;
