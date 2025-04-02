// controllers/adminController.js
import Admin from '../models/adminModel.js'; // Assuming your model is correctly set up
import bcrypt from 'bcryptjs'; // bcrypt for password hashing
import jwt from 'jsonwebtoken'; // JWT for generating tokens

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token (example: JWT)
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // 1 hour expiration
    );

    // Send the token as a response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin instance
      const newAdmin = new Admin({
        email,
        password: hashedPassword,
      });
  
      // Save the new admin
      await newAdmin.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };