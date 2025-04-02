import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from header
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.admin = verified; // Add admin data to request
    next(); // Continue to next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
