import express from 'express';
import {  adminPasswordReset, loginAdmin, logoutAdmin, registerAdmin, sendAdminPasswordResetEmail } from '../../controllers/admin/admin.js';
import { verifyToken } from '../../middelware/auth.js';

const router = express.Router();

// Admin registration route
router.post('/admin/admin-register', registerAdmin);

// Admin login route
router.post('/admin/admin-login', loginAdmin);

// Admin logout route
router.post('/admin/admin-logout', verifyToken, logoutAdmin);

// Admin Reset Password
router.post('/admin/admin-send-mail', sendAdminPasswordResetEmail)

router.post('/admin/reset-password/:id/:token', adminPasswordReset);

export default router;
