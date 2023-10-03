import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import { createLogo, deleteLogo, getAllLogos, getSingleLogo } from '../../controllers/company/company.js';

    const router = express.Router();

    // Set up storage for uploaded images
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/logo/'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
    });

    const upload = multer({ storage: storage });

    // Create a webinar
    router.post('/logo/insert-logo', upload.single('image'), createLogo);

    // Get all webinars
    router.get('/logo/get-all-logo', getAllLogos);

    // Single a webinar
    router.get('/get-single-logo/:id', getSingleLogo);

    // Delete a webinar
    router.delete('/logo-delete/:id', deleteLogo);

    export default router;