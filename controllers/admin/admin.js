import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { transporter } from '../../config/emailConfig.js';
import Admin from '../../models/admin/admin.js';

// ---------------------------------------------------
// Controller to handle admin registration
// ----------------------------------------------------

export const registerAdmin = async (req, res) => {
  const { first_name, last_name, username, password, password_confirmation, email } = req.body;

  try {
    // Check if admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    // Check if password and password_confirmation match
    if (password !== password_confirmation) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record
    const admin = new Admin({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      password_confirmation, // Add password_confirmation field here
      email,
    });

    // Save the admin record
    const savedAdmin = await admin.save();

    // Generate a token
    const token = jwt.sign({ adminId: savedAdmin._id }, 'your-secret-key', { expiresIn: '1h' });

    console.log("---check", savedAdmin);

    // Return a success response with the token
    return res.status(200).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    // Handle any errors that occurred during the registration process
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during registration' });
  }
};


// -----------------------------------------
// Controller to handle admin login
// ------------------------------------------

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin with the provided username exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if admin is already logged in
    if (admin.isLoggedIn) {
      return res.status(400).json({ message: 'Admin is already logged in' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin._id }, 'secretKey', { expiresIn: '1h' });

    // Update the admin's login status to true and save the token
    admin.isLoggedIn = true;
    admin.token = token;
    await admin.save();

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------------------------------
// Controller to handle admin logout
// --------------------------------------------

export const logoutAdmin = async (req, res) => {
  try {
    // Find the admin by ID
    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the admin's login status to false and clear the token
    admin.isLoggedIn = false;
    admin.token = undefined;
    await admin.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// ---------------------------------------------------------------------------
// Controller to handle admin password reset - Send reset password email
// ---------------------------------------------------------------------------

export const sendAdminPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const secret = admin._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ adminId: admin._id }, secret, {
        expiresIn: '15m',
      });

      const resetLink = `http://localhost:3000/api/gisul/reset/${admin._id}/${token}`;

      console.log(resetLink);
      // Send Email
      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: admin.email,
        subject: "GISUL - Password Reset Link",
        html: `<a href="${resetLink}">Click Here</a> to reset your password`,
     });
     console.log('----->', info)
     res.send({
       status: 'success',
       message: 'Password Reset Email Sent. Please Check Your Email',
     });
   } else {
     res.send({ status: 'failed', message: "Admin with this email doesn't exist" });
   }
 } catch (error) {
   res.status(500).json({ message: 'Server error' });
 }
};



// ---------------------------------------------------------------------
// Controller to handle admin password reset - Update password
// ---------------------------------------------------------------------

export const adminPasswordReset = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { id, token } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const secret = admin._id + process.env.JWT_SECRET_KEY;

    jwt.verify(token, secret, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      if (!password) {
        return res.status(400).json({ message: 'Please provide a new password' });
      }

      if (password !== password_confirmation) {
        return res.status(400).json({ message: 'Password confirmation does not match' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
      await admin.save();

      res.status(200).json({ message: 'Password reset successful' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};