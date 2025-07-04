import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser1 = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log('Auth Error:', error.message);
    res.status(401).json({ success: false, message: 'Token Invalid or Expired' });
  }
};

export default authUser1;
